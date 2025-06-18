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
        commentBody: 'James Cameron directed Avatar',
      },
      {
        userId: 2,
        questionId: 2,
        commentBody: 'Andy Weir',
      }, {
        userId: 3,
        questionId: 3,
        commentBody: 'The Milky Way moves at about about 1.89 million km/h',
      }, {
        userId: 1,
        questionId: 4,
        commentBody: 'A base model starts at $5000, mid-range is $500,000 and industrial grade is $10 million',
      }, {
        userId: 2,
        questionId: 5,
        commentBody: 'So in my view, King’s writing advice is an echo of high school English class by someone who has not kept up with linguistic studies of English grammar, and still follows a prescriptive rather than descriptive attitude toward writing. There’s nothing wicked about this — most of us remain the victims of our worst teachers all our lives. And we pass on whatever nonsense we believed. But King’s self-story is FAR more valuable, because it is not prescriptive at all. He simply tells us what happened and why, and that’s true storytelling.',
      }, {
        userId: 3,
        questionId: 6,
        commentBody: 'The first movie was released in 1984',
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