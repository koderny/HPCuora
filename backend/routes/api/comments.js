// --Imports--
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// --Utility Imports--
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');


// --Sequelize Imports--
const { User, Comment, Question } = require('../../db/models');

const validateComment = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Comment is required'),
]

//GET ALL COMMENTS
// Route to get all comments for a specific question
router.get('/:questionId/comments', async (req, res, next) => {
  const { questionId } = req.params;

  try {
    
    const question = await Question.findByPk(questionId);

    if (!question) {
      const noResourceError = new Error("Question couldn't be found");
      noResourceError.status = 404;
      throw noResourceError;
    }

    //comments tied to a specific question
    const comments = await Comment.findAll({  
      where: {
        question_id: questionId,
      },
      //include user info who posted question
      include: [ 
        {
          model: User,
          attributes: ['id', 'username', 'firstname', 'lastname'],
        },
      ],
      order: [['createdAt', 'ASC']], 
    });

    res.status(200);
    return res.json({ comments });

  } catch (error) {
    next(error);
  }
})



//ROUTE TO LEAVE A COMMENTS
router.post('/:question',requireAuth, validateComment, async (req, res, next) => {
  try {

    const userId = req.user.id;
    const { body } = req.body;

    const comment = await Comment.create({ 
        userId: parseInt(userId),
        body }); 

        res.status(200);
      return res.json(comment);

  } catch (e) {
    next(e)
  }
}
);




module.exports = router;
