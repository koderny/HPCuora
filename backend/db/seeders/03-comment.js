'use strict';
const { Comment } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Comment.bulkCreate([
      {
        userId: 1,
        questionId: 1,
        commnetBody: 'Such a lovely place to stay at',
      },
      {
        userId: 2,
        questionId: 2,
        commnetBody: 'had fun staying at this place',
      }, {
        userId: 3,
        questionId: 3,
        commnetBody: 'dificult to find a parking spot but enjoyed the stay',
      }, {
        userId: 1,
        questionId: 4,
        commnetBody: 'the heat was not working, do not recommend!!',
      }, {
        userId: 2,
        questionId: 5,
        commnetBody: 'got to create so many memories with my family, will definitely come back',
      }, {
        userId: 3,
        questionId: 5,
        commnetBody: 'the owner did not cooperate at all, were up all night in cold',
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};