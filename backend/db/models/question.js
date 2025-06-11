'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      // define association here
      Question.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author'
      });

      Question.hasMany(models.Comment, {
        foreignKey: 'questionId',
        as: 'comments',
        onDelete: "CASCADE",
        hooks: true
      });

      Question.hasMany(models.SavedQuestion, {
        foreignKey: 'questionId',
        as: 'savedByUsers',
        hooks: true
      });
    }
  }
  Question.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    questionBody: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
      onUpdate: DataTypes.NOW,
    },

  },
    {
      sequelize,
      modelName: 'Question',
      // defaultScope: {
      //     attributes: {
      //       exclude: ['createdAt', 'updatedAt'],
      //     },
      //   },
    }
  );
  return Question;
};
