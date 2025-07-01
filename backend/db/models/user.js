'use strict';
const { Model, DataTypes } = require('sequelize');
const { Validator } = require('sequelize')

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Question, {
        foreignKey: 'userId',
        as: "questions",
        onDelete: "CASCADE",
        hooks: true
      });

      User.hasMany(models.SavedQuestion, {
        foreignKey: "userId",
        as: "savedquestion",
        onDelete: "CASCADE",
        hooks: true
      });

      User.hasMany(models.Comment, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isAlpha: true,
        }
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          isAlpha: true
        }
      },
      username: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 25],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
        },

      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      // profilePicture: {
      //   type: DataTypes.STRING.BINARY,
      //   allowNull: false,
      //   validate: {
      //           notEmpty: true,
      //           len: [8, 500],
      //           isGoodUrl(val) {
      //               if (val.startsWith(" ")) {
      //                   throw new Error("Can't start with empty space")
      //               } else if (val.endsWith(" ")) {
      //                   throw new Error("Dont end with spaces please");
      //               }
      //           }
      //       }
      // }
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
    }
  );

  return User;
};
