'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: false
      },
      lastname: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: false
      }, 
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: false
      },
      gender: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: false
      },
      profilePicture: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: false
      },
      locationCity: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: false
      },
      lookingFor: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    return queryInterface.dropTable(options);
  }
};