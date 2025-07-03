'use strict';
const { Question } = require('../models');
const category = require('../models/category');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Categories';
    return queryInterface.bulkInsert(options, [
      {
        category: 'books',
      },
      {
        category: 'movies',
      }, {
        category: 'music',
      }, {
        category: 'science',
      }, {
        category: 'technology',
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Categories';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
