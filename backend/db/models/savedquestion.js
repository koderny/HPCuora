'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SavedQuestion extends Model {
    static associate(models) {
      // define association here
      SavedQuestion.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'saver'
      });

      SavedQuestion.belongsTo(models.Question, {
        foreignKey: 'questionId',
        as: 'savedQuestion'
      })
    }
  }
  SavedQuestion.init(
    {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
    questionId: {
      type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
        onUpdate: DataTypes.NOW,
    },
    },
     {
      sequelize,
      modelName: 'SavedQuestion',
      defaultScope: {
        attributes: {
           exclude: ['createdAt', 'updatedAt'],
        },
      },
    }
  );
  return SavedQuestion;
};