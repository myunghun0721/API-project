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
        review: 'The scenery was breathtaking, and the surroundings are pindrop silent, except for the birds :) The local grounds maintenance were cute (two adorable rabbits!) Jacques Cartier National Park makes for a great day trip near by.',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'The bed, linens and pillows are amazing. I generally shy away from rentals for that reason. This place was great.',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: "The house was amazing a true Architectural masterpiece! We truly enjoyed our stay, I highly recommend this home if you are looking for a unique experience",
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'An amazing experience. Quiet, serenity, inspiring.',
        stars: 3
      },
      {
        spotId: 4,
        userId: 3,
        review: 'This was our favorite air bnb experience, we feel privileged to have stayed here.',
        stars: 4
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Such a serenely beautiful place.',
        stars: 5
      },
      {
        spotId: 6,
        userId: 2,
        review: 'Beautiful place to stay!',
        stars: 3
      },
      {
        spotId: 11,
        userId: 3,
        review: 'This place was cozy and beautiful. It was super clean and great. Will definitely book this place again if I had the chance.',
        stars: 1
      },
      {
        spotId: 6,
        userId: 3,
        review: 'Awesome cozy little place',
        stars: 2
      },
      {
        spotId: 7,
        userId: 3,
        review: 'Amazing! i’d recommend this place to anyone and i would love to come back',
        stars: 4
      },
      {
        spotId: 8,
        userId: 1,
        review: "We're definitely visiting again!",
        stars: 4
      },
      {
        spotId: 9,
        userId: 1,
        review: 'This was an amazing experience. Beautiful location. Thank you',
        stars: 5
      },
      {
        spotId: 10,
        userId: 1,
        review: 'Beautiful house in great location',
        stars: 4
      },
      {
        spotId: 11,
        userId: 1,
        review: 'This house was absolutely lovely. Beautiful views, warm, cozy, inviting, great location. ',
        stars: 4
      },
      {
        spotId: 12,
        userId: 1,
        review: 'We loved this home. Walked in and the house was noticeably beautiful and well maintained.',
        stars: 3
      },
      {
        spotId: 13,
        userId: 2,
        review: 'Home was beautiful and pictures didn’t compare to the views in person. Home was spacious and cozy we felt right at home!',
        stars: 3
      },
      {
        spotId: 14,
        userId: 2,
        review: 'Absolutely Gem',
        stars: 4
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
