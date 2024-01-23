'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Kid%20Cat_NH_Model.png",
        preview: true
      },
      {
        spotId: 1,
        url: "https://soopool.art/image/acnh/ani/Kid%20Cat.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Kabuki_NH_Model.png",
        preview: false
      },
      {
        spotId: 2,
        url: "https://soopool.art/image/acnh/ani/Kabuki.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Puddles_NH_Model.png",
        preview: true
      },
      {
        spotId: 3,
        url: "https://soopool.art/image/acnh/ani/Puddles.jpg",
        preview: true
      },

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
