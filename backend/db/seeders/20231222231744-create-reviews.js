'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'test review',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'test review',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'test review',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'test review',
        stars: 3
      },
      {
        spotId: 4,
        userId: 3,
        review: 'test review',
        stars: 4
      },
      {
        spotId: 5,
        userId: 3,
        review: 'test review',
        stars: 5
      },
      {
        spotId: 6,
        userId: 2,
        review: 'test review',
        stars: 3
      },
      {
        spotId: 11,
        userId: 3,
        review: 'test review',
        stars: 1
      },
      {
        spotId: 6,
        userId: 3,
        review: 'test review',
        stars: 2
      },
      {
        spotId: 7,
        userId: 3,
        review: 'test review',
        stars: 4
      },
      {
        spotId: 8,
        userId: 1,
        review: 'test review',
        stars: 4
      },
      {
        spotId: 9,
        userId: 1,
        review: 'test review',
        stars: 5
      },
      {
        spotId: 10,
        userId: 1,
        review: 'test review',
        stars: 4
      },
      {
        spotId: 11,
        userId: 1,
        review: 'test review',
        stars: 4
      },
      {
        spotId: 12,
        userId: 1,
        review: 'test review',
        stars: 3
      },
      {
        spotId: 13,
        userId: 2,
        review: 'test review',
        stars: 3
      },
      {
        spotId: 14,
        userId: 2,
        review: 'test review',
        stars: 4
      },
      {
        spotId: 15,
        userId: 2,
        review: 'test review',
        stars: 5
      },

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
