'use strict';
const { Question } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Question.bulkCreate([
      {
        userId: 1,
        title: "Movies",
        questionBody: 'How old is planet earth?',
      },
      {
        userId: 2,
        title: "books",
        questionBody: 'had fun staying at this place',
      }, {
        userId: 3,
        title: "books",
        questionBody: 'dificult to find a parking spot but enjoyed the stay',
      }, {
        userId: 1,
        title: "music",
        questionBody: 'the heat was not working, do not recommend!!',
      }, {
        userId: 2,
        title: "books",
        questionBody: 'got to create so many memories with my family, will definitely come back',
      }, {
        userId: 3,
        title: "music",
        questionBody: 'the owner did not cooperate at all, were up all night in cold',
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