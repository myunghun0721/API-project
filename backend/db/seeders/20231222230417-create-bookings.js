'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        "startDate": "2024-01-01",
        "endDate": "2024-02-01"
      },
      {
        spotId: 1,
        userId: 1,
        "startDate": "2021-11-19",
        "endDate": "2021-12-20",
      },
      {
        spotId: 1,
        userId: 1,
        "startDate": "2028-01-19",
        "endDate": "2028-02-20",
      },
      {
        spotId: 2,
        userId: 2,
        "startDate": "2022-01-19",
        "endDate": "2022-02-20",
      },
      {
        spotId: 3,
        userId: 3,
        "startDate": "2024-03-19",
        "endDate": "2024-03-20",
      },

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
