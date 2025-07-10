'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Harold',
        lastName: 'Pedraza',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: "https://avatars.githubusercontent.com/u/155031377?v=4"

      },
      {
        firstName: 'Anthony',
        lastName: 'Bronca',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password1'),
        profilePicUrl: "https://avatars.githubusercontent.com/u/95654116?v=4"
      },
      {
        firstName: 'Roger',
        lastName: 'Diaz',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2'),
        profilePicUrl: ""
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3'),
        profilePicUrl: ""
        
      },
      {
        firstName: 'Mike',
        lastName: 'Smith',
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4'),
        profilePicUrl: ""
      },
      {
        firstName: 'Claudia',
        lastName: 'Black',
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password5'),
        profilePicUrl: ""
      },
      {
        firstName: 'Anthony',
        lastName: 'Kiedis',
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password6'),
        profilePicUrl: "https://geneacdn.net/bundles/geneanetgeneastar/images/celebrites/200px/kiedisantho.jpg"
      },
      {
        firstName: 'Chad',
        lastName: 'Smith',
        email: 'user7@user.io',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password7'),
        profilePicUrl: "https://www.moderndrummer.com/wp-content/uploads/2011/08/Chad-Smith-Modern-Drummer-1-e1313609138321.jpg?w=781"
      },
      {
        firstName: 'John',
        lastName: 'Frusciante',
        email: 'user8@user.io',
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password8'),
        profilePicUrl: "https://assets.exclaim.ca/dr2uqw6xy/image/upload/c_limit,w_890/f_auto/q_auto/john-frusciante-rhcp-2022-matt-forsythe?_a=BAVAfVIB0"
      },
      {
        firstName: 'Michael',
        lastName: 'Balzary',
        email: 'user9@user.io',
        username: 'FakeUser9',
        hashedPassword: bcrypt.hashSync('password9'),
        profilePicUrl: "https://media.baselineresearch.com/images/789366/789366_full.jpg"
      },
      
      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
