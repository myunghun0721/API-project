'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'testuser1@test.com',
        username: 'test_user_1',
        firstName: 'User',
        lastName: 'One',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'testuser2@test.com',
        username: 'test_user_2',
        firstName: 'User',
        lastName: 'Two',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'testuser3@test.com',
        username: 'test_user_3',
        firstName: 'User',
        lastName: 'Three',
        hashedPassword: bcrypt.hashSync('password3')
      }
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
