'use strict';
const { Question } = require('../models');
const category = require('../models/category');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Questions';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        questionBody: 'Who directed Avatar?',
        categoryId: 1
      },
      {
        userId: 2,
        questionBody: 'Who wrote Project Hail Mary?',
        categoryId: 2
      }, {
        userId: 3,
        questionBody: 'How fast is the milky way moving accross the universe?',
        categoryId: 2
      }, {
        userId: 1,
        questionBody: 'What is the price of a quantum computer in 2025?',
        categoryId: 3
      }, {
        userId: 2,
        questionBody: "What do you think of Stephen King's book 'On Writing'?",
        categoryId: 3
      }, {
        userId: 3,
        questionBody: 'In what year was the movie Terminator released?',
        categoryId: 1
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Questions';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
