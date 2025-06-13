// --Imports--
const express = require('express');
const router = express.Router();

// --Utility Imports--
const { requireAuth } = require('../../utils/auth');

// --Sequelize Imports--
const { Question, QuestionImage } = require('../../db/models');



router.delete('/:imageId', requireAuth, async (req, res, next) => {
    try {
        const imageId = req.params.imageId;

        const questionImage = await QuestionImage.findByPk(imageId, {
            include: [{ model: Question }]
        });

        if (!questionImage) {
            const error = new Error("Question Image couldn't be found");
            error.status = (404);
            throw error;
        }

        
        if (req.user.id !== questionImage.Question.userId) {
            const error = new Error("Forbidden");
            error.status = (403);
            throw error;
        }

        // await questionImage.destroy();
        await QuestionImage.destroy({
            where: {
                id: imageId
            }
        })

        res.status(200);
        return res.json({ message: "Successfully deleted" });

    } catch (error) {
        next(error);
    }
});

module.exports = router;