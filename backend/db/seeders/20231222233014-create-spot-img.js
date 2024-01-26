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
      {
        spotId: 4,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Cephalobot_NH_Model.png",
        preview: true
      },
      {
        spotId: 4,
        url: "https://soopool.art/image/acnh/ani/Cephalobot.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Petri_NH_Model.png",
        preview: true
      },
      {
        spotId: 5,
        url: "https://soopool.art/image/acnh/ani/Petri.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Marty_NH_Model.png",
        preview: true
      },
      {
        spotId: 6,
        url: "https://soopool.art/image/acnh/ani/Marty.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Judy_NH_Model.png",
        preview: true
      },
      {
        spotId: 7,
        url: "https://soopool.art/image/acnh/ani/Judy.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Sasha_NH_Model.png",
        preview: true
      },
      {
        spotId: 8,
        url: "https://soopool.art/image/acnh/ani/Sasha.jpg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Marlo_NH_Model.png",
        preview: true
      },
      {
        spotId: 9,
        url: "https://soopool.art/image/acnh/ani/Marlo.jpg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Shino_NH_Model.png",
        preview: true
      },
      {
        spotId: 10,
        url: "https://soopool.art/image/acnh/ani/Shino.jpg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Raymond_NH_Model.png",
        preview: true
      },
      {
        spotId: 11,
        url: "https://soopool.art/image/acnh/ani/Raymond.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Tiansheng_NH_Model.png",
        preview: true
      },
      {
        spotId: 12,
        url: "https://soopool.art/image/acnh/ani/Tiansheng.jpg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Chelsea_NH_Model.png",
        preview: true
      },
      {
        spotId: 13,
        url: "https://soopool.art/image/acnh/ani/Chelsea.jpg",
        preview: true
      },
      {
        spotId: 14,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Walt_NH_Model.png",
        preview: true
      },
      {
        spotId: 14,
        url: "https://soopool.art/image/acnh/ani/Walt.jpg",
        preview: true
      },
      {
        spotId: 15,
        url: "https://soopool.art/image/acnh/out/360px-House_of_Knox_NH_Model.png",
        preview: true
      },
      {
        spotId: 15,
        url: "https://soopool.art/image/acnh/ani/Knox.jpg",
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
