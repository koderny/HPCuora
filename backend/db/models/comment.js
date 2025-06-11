'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'commenter'
      });

      Comment.belongsTo(models.Question, {
        foreignKey: 'questionId',
        as: 'question'
      })
    }
  }
  Comment.init(
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
      commentBody: {
        types: DataTypes.STRING(2000),
        allowNull: false
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
      modelName: 'Comment',
      defaultScope: {
        attributes: {
          //  exclude: ['createdAt', 'updatedAt'],
        },
      },
    }
  );
  return Comment;
};