// --Imports--
const express = require('express');
const router = express.Router();

// --Utility Imports--
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');

// --Sequelize Imports--
const { User, Comment, Question, QuestionImage, SavedQuestion } = require('../../db/models');

//GET ALL FAVORITES/SAVED QUESTIONS
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const savedQuestions = await SavedQuestion.findAll({
            where: { userId },
            attributes: ["id", "userId"],
            include: [
                {
                    model: Question,
                    as: 'favQuestion',
                    include: [
                        {
                            model: User,
                            as: "author",
                        },

                    ]
                },
            ]
        });

        return res.json({ Questions: savedQuestions });
    } catch (e) {
        next(e);
    }
});

// Route to add a question to favorites
router.post('/:questionId', requireAuth, async (req, res, next) => {
    try {
        const questionId = req.params.questionId;
        const userId = req.user.id
        console.log(userId)
        const existingQuestion = await Question.findByPk(questionId);

        if (!existingQuestion) {
            const invalidQuestionId = new Error("Question couldn't be found");
            invalidQuestionId.status = 404;
            throw invalidQuestionId;
        }

        const [savedQuestion] = await SavedQuestion.findOrCreate({
            where: {
                userId: userId,
                questionId: parseInt(questionId),
            }
        });

        return res.status(201).json(savedQuestion);
    } catch (error) {
        next(error);
    }
});

//Delete favorite

router.delete('/:questionId', requireAuth, async (req, res, next) => {
    try {
        const { questionId } = req.params;
        const userId = req.user.id;
        const savedQuestion = await SavedQuestion.findOne({
            where: {
                userId: userId,
                questionId: parseInt(questionId),
            }
        });

        if (!savedQuestion) {
            const err = new Error("Question couldn't be found");
            err.status = 404;
            throw err;
        }

        if (savedQuestion.userId !== userId) {
            const err = new Error('Forbidden');
            err.status = 403;
            throw err;
        }

        await savedQuestion.destroy();
        return res.json({ message: "Successfully deleted" });
    } catch (e) {
        next(e);
    }
});

module.exports = router;