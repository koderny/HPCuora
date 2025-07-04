'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        // type: Sequelize.ENUM('books', 'movies', 'music', 'science', 'technology'),
        // values: ['books', 'movies', 'music', 'science', 'technology'],

        type: Sequelize.STRING, 
        allowNull: false,
        validate: {
          isIn: {
            args: [['books', 'movies', 'music', 'science', 'technology']], 
            msg: 'Only books, movies, science and technology accepted'
          }
        }

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
    options.tableName = "Categories";
    return queryInterface.dropTable(options);
  }
};