'use strict';
const { SavedQuestion } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SavedQuestions';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        questionId: 1,
      },
      {
        userId: 2,
        questionId: 2,

      }, {
        userId: 3,
        questionId: 3,

      }, {
        userId: 1,
        questionId: 4,

      }, {
        userId: 2,
        questionId: 5,

      }, {
        userId: 3,
        questionId: 5,
      },

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'SavedQuestions';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
