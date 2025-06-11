// --Imports--
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// --Utility Imports--
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');


// --Sequelize Imports--
const { User, Comment, Question, QuestionImage } = require('../../db/models');

const validateQuestion = [
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Question is required'),
]

//GET ALL QUESTIONS
router.get('/', async (req, res, next) => {
    try {
        const questions = await Question.findAll({
            attributes: ["id", "userId", "title", "questionBody"],
            include: [
                {
                    model: QuestionImage
                }
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
    const { title, questionBody, previewImgUrl  } = req.body

    const newQuestion = await Question.create({
      userId: req.user.id, title, questionBody
    });

    await QuestionImage.bulkCreate([
      {
        questionId: newQuestion.id,
        url: previewImgUrl,
        preview: true
      },

    ])

    res.status(201);
    return res.json(newQuestion);

  } catch (e) {
    next(e);
  }
});

//GET QUESTION BY ID

router.get('/:id', async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.id,
      {
        include: [{
          model: QuestionImage,
          attributes: ['questionId', 'url', 'preview']
        }, {
          model: User,
          as: "User",
          attributes: ['id', 'firstName', 'lastName']
        }]
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


//GET QUESTIONS BY USER ID
router.get('/current', requireAuth, async (req, res, next) => {
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
          attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: QuestionImage,
            attributes: ['url', 'preview']
        }
      ]
    });

    return res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
});


// EDIT/UPDATE A QUESTION
// Complete route /api/spots/:spotId
router.put('/:id', requireAuth, validateQuestion, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

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

    const { title, questionBody } = req.body;

    existingQuestion.title = title;
    existingQuestion.questionBody = questionBody;


    await existingQuestion.save();

    return res.status(200).json(existingQuestion);
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

    if (existingQuestion.userId !== userId){
        const error = new Error('Forbidden')
        error.status = 403
        throw error;
    }

    const existingImage = await QuestionImage.findOne({
      where: { questionId: questionId }
    });

    if (existingImage) {
      const error = new Error('Question already has an image.');
      error.status = 400;
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


//LEAVE A COMMENT BASED ON A QUESTION ID
router.post('/:questionId/comment', requireAuth, validateComment, async (req, res, next) => {
    try {

        const { questionId } = req.params; //from Question table
        const userId = req.user.id;
        const { commentbody } = req.body; //from Comment table

        const question = Question.findByPk(questionId);

        if (!Question) {
            let noResourceError = new Error("Question couldn't be found");
            noResourceError.status = 404;
            throw noResourceError;
        }

        const comment = await Comment.create({ userId, questionId, commentbody });
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