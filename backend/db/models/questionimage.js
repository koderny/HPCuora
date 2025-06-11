'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class QuestionImage extends Model {
        static associate(models) {

            // define association here

            QuestionImage.belongsTo(models.Question, {
                foreignKey: "questionId",
                onDelete: "CASCADE",
                hooks: true
            });

        }
    }
    QuestionImage.init({
        questionId: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 500],
                isGoodUrl(val) {
                    if (val.startsWith(" ")) {
                        throw new Error("Can't start with empty space")
                    } else if (val.endsWith(" ")) {
                        throw new Error("Dont end with spaces please");
                    }
                }
            }
        },
        preview: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
        {
            sequelize,
            modelName: 'QuestionImage',
            // defaultScope: {
            //     attributes: {
            //       exclude: ['createdAt', 'updatedAt'],
            //     },
            //   },
        }
    );
    return QuestionImage;
};
