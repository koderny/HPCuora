// --Imports--
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// --Utility Imports--
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');


// --Sequelize Imports--
const { User, Comment, Question, QuestionImage, Category } = require('../../db/models');

const validateQuestion = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Question is required'),
]

//GET ALL QUESTIONS
router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      attributes: ["id", "userId", "questionBody", "categoryId"],
       order: [
            ['createdAt', 'DESC'],
        ],
      include: [
        {
          model: QuestionImage,
          as: 'questionImage',
        },
        {
          model: User,
          as: "author",
        },
        {
          model: Comment,
          as: "comments"
        },
        
      ]
    });

    const prettyQuestions = [];

    for (let question of questions) {
      const questionObj = await question.toJSON();
      console.log(questionObj)

      // Get the questionImage
      let previewImageUrl = null;
      if (questionObj.QuestionImages && questionObj.QuestionImages.length > 0) {
        for (let previewImage of questionObj.QuestionImages) {
          if (previewImage.preview === true) {
            previewImageUrl = previewImage.url;
            break;
          }
        }

        if (!previewImageUrl) {
          previewImageUrl = questionObj.QuestionImages[0].url;
        }
      }


      questionObj.previewImage = previewImageUrl;
      delete questionObj.QuestionImages;
      prettyQuestions.push(questionObj)

    }

    return res.json({ Questions: prettyQuestions });
  } catch (e) {
    next(e);
  }
});


//CREATE A QUESTION
router.post('/', requireAuth, validateQuestion, async (req, res, next) => {
  try {
    const { questionBody, previewImgUrl, categoryId } = req.body

    const newQuestion = await Question.create({
      userId: req.user.id, questionBody, categoryId
    });

    await QuestionImage.bulkCreate([
      {
        questionId: newQuestion.id,
        url: previewImgUrl,
        preview: true
      },

    ])

    const newQuestionWithAssociation = await Question.findByPk(newQuestion.id,
      {
        include: [
          {
            model: QuestionImage,
            as: 'questionImage',
          },
          {
            model: User,
            as: "author",
          },
          {
            model: Comment,
            as: "comments"
          }
        ]
      }
    )

    res.status(201);
    return res.json(newQuestionWithAssociation);

  } catch (e) {
    next(e);
  }
});


//GET Current user questions
router.get('/current', requireAuth, async (req, res, next) => {
  console.log("current triggered")
  try {

    const userId = req.user.id;
    const questions = await Question.findAll({
      where: {
        userId: parseInt(userId)
      },
      attributes: ['id', 'userId', 'title', 'questionBody'],
  
      include: [
        {
          model: User,
          as: "author",
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: QuestionImage,
          as: "questionImage",
          attributes: ['url', 'preview']
        }
      ]
    });

    return res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
});

//GET QUESTION BY ID

router.get('/:id', async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.id,
      {
        include: [{
          model: QuestionImage,
          as: "questionImage",
          attributes: ['questionId', 'url', 'preview', "id"]
        }, {
          model: User,
          as: "author",
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Comment,
          as: "comments",
        }
        ]
      });

    if (!question) {
      const err = new Error("Question couldn't be found");
      err.status = 404;
      return next(err);
    }

    return res.json(question);
  } catch (error) {
    next(error);
  }
});



// EDIT/UPDATE A QUESTION
// Complete route /api/spots/:spotId
router.put('/:id', requireAuth, validateQuestion, async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id, "question id")
    const userId = req.user.id;
    const { questionBody, imageUrls = [] } = req.body;
    const existingQuestion = await Question.findByPk(id);

    if (!existingQuestion) {
      const error = new Error("Question couldn't be found");
      error.status = 404;
      throw error;
    }

    if (existingQuestion.userId !== userId) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    existingQuestion.questionBody = questionBody;


    await existingQuestion.save();
  
    await QuestionImage.destroy({ where: {questionId: id}});
    if(imageUrls.length > 0) {
      const createImages = imageUrls.map((url, idx) => ({
       questionId: id,
       url,
       preview: idx === 0 //true
      }))
      await QuestionImage.bulkCreate(createImages)

    }

    const updatedQuestionWithImages = await Question.findByPk(id, {
      include: [
        {
          model: QuestionImage,
          as: 'questionImage'
        }
      ]
    })

    return res.status(200).json(updatedQuestionWithImages);
  } catch (error) {
    next(error);
  }
});


// Add a Question Image to an existing question based on Question ID (user auth required)
router.post('/:id/images', requireAuth, async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const { url, preview } = req.body;
    const userId = req.user.id

    const existingQuestion = await Question.findByPk(questionId);

    if (!existingQuestion) {
      const invalidQuestionId = new Error("Question couldn't be found");
      invalidQuestionId.status = 404;
      throw invalidQuestionId;
    }

    if (existingQuestion.userId !== userId) {
      const error = new Error('Forbidden')
      error.status = 403
      throw error;
    }

    const newImage = await QuestionImage.create({
      questionId: parseInt(questionId),
      url,
      preview: true,
    });

    return res.status(201).json(newImage);
  } catch (error) {
    next(error);
  }
});



// DELETE A QUESTION
router.delete('/:questionId', requireAuth, async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const userId = req.user.id;
    const question = await Question.findByPk(questionId);

    if (!question) {
      const err = new Error("Question couldn't be found");
      err.status = 404;
      throw err;
    }

    if (question.userId !== userId) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }

    await question.destroy();
    return res.json({ message: "Successfully deleted" });
  } catch (e) {
    next(e);
  }
});


//CREATE A COMMENT BASED ON A QUESTION ID
router.post('/:questionId/comment', requireAuth, async (req, res, next) => {
  try {

    const { questionId } = req.params; //from Question table
    const userId = req.user.id;
    const { commentBody } = req.body; //from Comment table

    const question = Question.findByPk(questionId);

    if (!question) {
      let noResourceError = new Error("Question couldn't be found");
      noResourceError.status = 404;
      throw noResourceError;
    }

    const comment = await Comment.create({ userId, questionId, commentBody });
    res.status(200);
    return res.json(comment);

  } catch (e) {
    next(e)
  }
}
);

// Get all comments belonging to a question based on question id
router.get('/:id/comments', async (req, res, next) => {
  try {

    const questionId = req.params.id;

    const question = await Question.findByPk(questionId);
    if (!question) {
      const noQuestionError = new Error("Question couldn't be found");
      noQuestionError.status = 404;
      throw noQuestionError;
    }

    const comments = await Comment.findAll({
      where: {
        questionId: questionId
      },
      include: [
        {
          model: User,
          as: "commenter",
          attributes: ["id", "firstName", "lastName"]

        },
      ]
    });

    res.status(200);
    return res.json({ Comments: comments });
    // return res.json({Reviews: prettyReviews});
  } catch (error) {
    next(error);
  }
});


module.exports = router;