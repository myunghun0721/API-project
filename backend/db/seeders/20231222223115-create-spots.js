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
        address: "111 test street",
        city: "test",
        state: "tt",
        country: "test country 1",
        lat: -87.7645358,
        lng: -122.4730327,
        name: "test 1",
        description: "User One testing seed no.1",
        price: 111
      },
      {
        ownerId: 1,
        address: "222 test street",
        city: "test2",
        state: "tt2",
        country: "test country 2",
        lat: -57.7645358,
        lng: 22.4730327,
        name: "test 2",
        description: "User One testing seed no.2",
        price: 222
      },
      {
        ownerId: 1,
        address: "333 test street",
        city: "test3",
        state: "tt3",
        country: "test country 3",
        lat: 80.7645358,
        lng: 122.4730327,
        name: "test 3",
        description: "User One testing seed no.3",
        price: 333
      },
      {
        ownerId: 1,
        address: "123 somewhere street",
        city: "somewhere",
        state: "SW",
        country: "somewhere country",
        lat: 77.7645358,
        lng: -162.4730327,
        name: "SOMEWHERE",
        description: "User One fancy testing seed no.1",
        price: 500
      },
      {
        ownerId: 1,
        address: "412 hidden street",
        city: "hidden",
        state: "HDD",
        country: "hidden country",
        lat: 33.7645358,
        lng: 33.4730327,
        name: "HIDDEN",
        description: "User One fancy testing seed no.2",
        price: 1000
      },
      {
        ownerId: 2,
        address: "444 test street",
        city: "test4",
        state: "tt4",
        country: "test country 4",
        lat: -27.7645358,
        lng: -72.4730327,
        name: "test 4",
        description: "User Two testing seed no.1",
        price: 444
      },
      {
        ownerId: 2,
        address: "555 test street",
        city: "test5",
        state: "tt5",
        country: "test contry 5",
        lat: 57.7645358,
        lng: 42.4730327,
        name: "test 5",
        description: "User Two testing seed no.2",
        price: 555
      },
      {
        ownerId: 2,
        address: "666 test street",
        city: "test6",
        state: "tt6",
        country: "test country 6",
        lat: 27.7645358,
        lng: 22.4730327,
        name: "test 6",
        description: "User Two testing seed no.3",
        price: 666
      },
      {
        ownerId: 2,
        address: "247 epic street",
        city: "epic",
        state: "EP",
        country: "epic country",
        lat: 97.7645358,
        lng: 177.4730327,
        name: "EPIC",
        description: "User Two fancy testing seed no.1",
        price: 2000
      },
      {
        ownerId: 2,
        address: "100 bad street",
        city: "bad",
        state: "BD",
        country: "bad country",
        lat: -80.7645358,
        lng: 100.4730327,
        name: "BAD",
        description: "User Two fancy testing seed no.2",
        price: 100
      },
      {
        ownerId: 3,
        address: "777 test street",
        city: "test7",
        state: "tt7",
        country: "test country 7",
        lat: 77.7645358,
        lng: -152.4730327,
        name: "test 7",
        description: "User Three testing seed no.1",
        price: 777
      },
      {
        ownerId: 3,
        address: "888 test street",
        city: "test8",
        state: "tt8",
        country: "test country 8",
        lat: 22.7645358,
        lng: 188.4730327,
        name: "test 8",
        description: "User Three testing seed no.2",
        price: 888
      },
      {
        ownerId: 3,
        address: "999 test street",
        city: "test9",
        state: "tt9",
        country: "test country 9",
        lat: 1.7645358,
        lng: 19.4730327,
        name: "test 9",
        description: "User Three testing seed no.3",
        price: 999
      },
      {
        ownerId: 3,
        address: "2810 decent street",
        city: "decent",
        state: "DC",
        country: "decent country",
        lat: 15.7645358,
        lng: -15.4730327,
        name: "DECENT",
        description: "User Three fancy testing seed no.1",
        price: 250
      },
      {
        ownerId: 3,
        address: "7810 normal street",
        city: "normal",
        state: "NM",
        country: "normal country",
        lat: 11.7645358,
        lng: -65.4730327,
        name: "NORMAL",
        description: "User Three fancy testing seed no.2",
        price: 345
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
