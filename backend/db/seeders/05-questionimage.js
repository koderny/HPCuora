'use strict';

const { QuestionImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'QuestionImages';
    return queryInterface.bulkInsert(options, [
      {
        questionId: 1,
        url: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*sfOToFJa35tWms48BWzpfg.jpeg",
        preview: true
      },
      {
        questionId: 2,
        url: "https://m.media-amazon.com/images/I/81zD9kaVW9L._SL1500_.jpg",
        preview: true
      },
      {
        questionId: 3,
        url: "https://starwalk.space/gallery/images/milky-way-faq/1140x641.jpg",
        preview: true
      },
      {
        questionId: 4,
        url: "https://static.scientificamerican.com/dam/m/653f47689d1d0828/original/d-wave_annealing_quantum_computer_prototype.jpg?m=1741813678.273&w=900",
        preview: true
      },
      {
        questionId: 5,
        url: "https://devontrevarrowflaherty.com/wp-content/uploads/2020/04/on-writing.jpg",
        preview: true
      },

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'QuestionImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
