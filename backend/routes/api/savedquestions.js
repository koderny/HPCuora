// --Imports--
const express = require('express');
const router = express.Router();

// --Utility Imports--
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');

// --Sequelize Imports--
const { User, Comment, Question, QuestionImage, SavedQuestion } = require('../../db/models');

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
                },
            ]
        });

        const prettyQuestions = [];

        for (let question of savedQuestions) {
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

module.exports = router;