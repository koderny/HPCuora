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

// Route to update an existing comment
router.put('/:commentId', requireAuth, validateComment, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;

  
    const existingComment = await Comment.findByPk(commentId);

    if (!existingComment) {
      
      let noCommentError = new Error("Comment couldn't be found");
      noCommentError.status = 404;
      throw noCommentError;
    }

    if (existingComment.userId !== userId) {
      
      let notUserCommentError = new Error("Forbidden: This is not your Comment");
      notUserCommentError.status = 403;
      throw notUserCommentError;
    }

    
    existingComment.commentBody = comment;
    
    await existingComment.save();
    
    return res.json(existingComment);
  } catch (error) {
    next(error);
  }
});



// Route to get all comments written by the current user
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const comments = await Comment.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Question,
          attributes: ['id', 'userId', 'title', 'questionBody'],
          include: [
            {
              model: QuestionImage,
              attributes: ['url'],
            }
          ]
        },
      ]
    });

    // Formatting the reviews to make it pretty
    const formattedComments = comments.map(comment => {
      const commentData = comment.toJSON();
      if (commentData.Question && commentData.Question.QuestionImages && commentData.Question.QuestionImages.length > 0) {
        commentData.Question.previewImage = commentData.Question.QuestionImages[0].url;
      } else {
        commentData.Question.previewImage = null;
      }
      delete commentData.Question.QuestionImages;
      return commentData;
    });

    return res.json({ Comments: formattedComments });
  } catch (error) {
    next(error);
  }
});




module.exports = router;
