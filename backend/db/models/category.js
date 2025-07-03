'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      Category.hasMany(models.Question, {
        foreignKey: 'categoryId',
        as: 'categories', 
        onDelete: 'CASCADE'
      });
    }
  }

  Category.init({
    category: {
      type: DataTypes.ENUM,
      values: ['books', 'movies', 'music', 'science', 'technology'],
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
      modelName: 'Category',
      tableName: 'Categories',
      defaultScope: {
          attributes: {
            // exclude: ['createdAt', 'updatedAt'],
          },
        },
    }
  );
  return Category;
};