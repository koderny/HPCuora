'use strict';
const { Comment } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    return queryInterface.bulkInsert(options, [
      {
        userId: 2,
        questionId: 1,
        commentBody: "Avatar itself was always described as 'Dances with wolves in space.' It’s naive to think Avatar 2 would be any different.",
      },
      {
        userId: 3,
        questionId: 1,
        commentBody: "Yes visuals are incredible and treat to watch. However, storyline is not so good.",
      },

      {
        userId: 3,
        questionId: 2,
        commentBody: "Save yourself a boring ordeal and don't read any version. I forced myself to read this turgid load of crap in the original German during my university years- it was NOT worth the time or effort."
      }, {
        userId: 4,
        questionId: 2,
        commentBody: "Frankly, even the German version makes your head explode from sheer tediousness and pompousness. I gave up after ten pages or so.."
      }, {
        userId: 5,
        questionId: 2,
        commentBody: "Even Mussolini thought the book of his pal Adolf sucked big time."
      }, 
       {
        userId: 3,
        questionId: 3,
        commentBody: 'The Milky Way moves at about about 1.89 million km/h',
      }, {
        userId: 1,
        questionId: 4,
        commentBody: 'A base model starts at $5000, mid-range is $500,000 and industrial grade is $10 million',
      }, {
        userId: 10,
        questionId: 4,
        commentBody: 'Too much money 🤑',
      },
       {
        userId: 2,
        questionId: 5,
        commentBody: 'So in my view, King’s writing advice is an echo of high school English class by someone who has not kept up with linguistic studies of English grammar, and still follows a prescriptive rather than descriptive attitude toward writing. There’s nothing wicked about this — most of us remain the victims of our worst teachers all our lives. And we pass on whatever nonsense we believed. But King’s self-story is FAR more valuable, because it is not prescriptive at all. He simply tells us what happened and why, and that’s true storytelling.',
      }, {
        userId: 8,
        questionId: 5,
        commentBody: "King makes it look so easy. From his accounts he was a constant reader of pulp fiction, and it's clear he lives and breathes story and plot.",
      },
      {
        userId: 3,
        questionId: 6,
        commentBody: 'The first movie was released in 1984',
      }, {
        userId: 7,
        questionId: 6,
        commentBody: 'First movie in 1984, second in 1991, third in 2003, fourth in 2009, fifth in 2015 and the last one in 2019',
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
