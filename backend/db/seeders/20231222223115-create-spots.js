'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 test street",
        city: "test",
        state: "tt",
        country: "tetris",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "test 1",
        description: "testing seed no.1",
        price: 111
      },
      {
        ownerId: 2,
        address: "222 test street",
        city: "test2",
        state: "tt2",
        country: "tetris2",
        lat: 137.7645358,
        lng: -22.4730327,
        name: "test 2",
        description: "testing seed no.2",
        price: 222
      },
      {
        ownerId: 3,
        address: "333 test street",
        city: "test3",
        state: "tt3",
        country: "tetris3",
        lat: 137.7645358,
        lng: -122.4730327,
        name: "test 3",
        description: "testing seed no.3",
        price: 333
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
