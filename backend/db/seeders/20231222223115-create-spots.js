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
        address: "123 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: -87.7645358,
        lng: -122.4730327,
        name: "Kid Cat's House",
        description: "In Animal Crossing: New Horizons, if Kid Cat is one of the starter villagers, his house will have craftable items primarily from the Wooden Series. He cannot have his initial house interior unless he moves out of the player's island or the Happy Home Paradise DLC is purchased, in which either the player or Isabelle can reset the interior.",
        price: 75
      },
      {
        ownerId: 1,
        address: "125 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: -89.7645358,
        lng: -142.4730327,
        name: "Kabuki's House",
        description: "Kabuki's house features the same furniture layout as Del's in Doubutsu no Mori e+.",
        price: 60
      },
      {
        ownerId: 1,
        address: "155 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: -79.7645358,
        lng: 42.4730327,
        name: "Puddles's House",
        description: "In Animal Crossing: New Horizons, if Puddles is one of the villagers who moved in during the main storyline after the villager house development quest, her house will have a combination of non-craftable furniture, plus items crafted by players during the island development storyline, primarily from the Wooden Block Series. She cannot have her initial house interior unless she moves out of the player's island or the Happy Home Paradise DLC is purchased, in which either the player or Isabelle can reset the interior.",
        price: 80
      },
      {
        ownerId: 1,
        address: "170 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: 39.7645358,
        lng: 42.4730327,
        name: "Cephalobot's House",
        description: "Has kitchen stove, operating-room cart, robot arm, inspection equipment, and cold sleep pod!",
        price: 500
      },
      {
        ownerId: 1,
        address: "181 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: 33.7645358,
        lng: 33.4730327,
        name: "Petri's House",
        description: "This house provide lucky cat, hospital bed, compact kitchen, modern office chair, examination-room, medicine chest and science pot!!",
        price: 1000
      },
      {
        ownerId: 2,
        address: "182 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: -27.7645358,
        lng: -72.4730327,
        name: "Marty's House",
        description: "Marty's house provides: Pompompurin Bed, Pompompurin Chair, Pompompurin Pudding, Pompompurin Rack, Pompompurin Table, and Pompompurin TV",
        price: 250
      },
      {
        ownerId: 2,
        address: "185 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: -27.7645358,
        lng: -72.4730327,
        name: "Knox's House",
        description: "Knox's house provides: Upright Piano, Aquarius Urn, Red Carpet, Golden Casket, Golden Candelstick, Cancer Table, and Phonograph",
        price: 555
      },
      {
        ownerId: 2,
        address: "205 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: 27.7645358,
        lng: 22.4730327,
        name: "Walt's House",
        description: "Walt's house provides: Raccoon Figurine, Bonsai Shelf, Pond Stone, Green-Leaf Pile, Bamboo Speaker, Deer Scare, Bamboo Bench, and Simple Well",
        price: 450
      },
      {
        ownerId: 2,
        address: "208 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: 97.7645358,
        lng: 177.4730327,
        name: "Chelsea's House",
        description: "Chelsea always brings the essentials when going on a camping trip: her collection of My Melody paraphernalia and a bowl of cookie dough.",
        price: 2000
      },
      {
        ownerId: 2,
        address: "212 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: -80.7645358,
        lng: 100.4730327,
        name: "Tiansheng's House",
        description: "Tiansheng's house provides: Kichen Stove, Tape Deck, Ventilation Fan, Kitchen Counter, Steamer-Basket Set, Double-Door Refrigerator, Freezerm Imperial Pot, Kichen Dishwasher, Pile of Cardboard Boxes, and Cinese-Style Meal",
        price: 100
      },
      {
        ownerId: 3,
        address: "225 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: 77.7645358,
        lng: -152.4730327,
        name: "Raymond's House",
        description: "Raymond's house provides: Office Desk, Whiteboard, Document Stack, Desktop Computer, Water Cooler, Modern Office Chair, Iron Worktable, Safe, Den Chair, Wall Clock, Document Stack, Fax Machine, Formal Paper, Den Desk, Mug, and Newton's Cradle",
        price: 777
      },
      {
        ownerId: 3,
        address: "255 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: 22.7645358,
        lng: 188.4730327,
        name: "Shino's House",
        description: "In Animal Crossing: New Horizons, if Shino is one of the villagers who moved in during the main storyline after the villager house development quest, her house will have a combination of non-craftable furniture, plus items crafted by players during the island development storyline, primarily from the Wooden Block Series. She cannot have her initial house interior unless she moves out of the player's island or the Happy Home Paradise DLC is purchased, in which either the player or Isabelle can reset the interior.",
        price: 800
      },
      {
        ownerId: 3,
        address: "258 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: 1.7645358,
        lng: 19.4730327,
        name: "Marlo's House",
        description: "Marlo's house provides: Phonograph, Safe, Laptop, Double Sofa, Den Desk, Den Chair, Aluminum Brifcase, Cool Low Table, and Cool Side Table",
        price: 220
      },
      {
        ownerId: 3,
        address: "267 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: 15.7645358,
        lng: -15.4730327,
        name: "Sasha's House",
        description: "In Animal Crossing: New Horizons, if Sasha is one of the villagers who moved in during the main storyline after the villager house development quest, his house will have a combination of non-craftable furniture, plus items crafted by players during the island development storyline, primarily from the Log Series and applicable native fruit sets. He cannot have his initial house interior unless he moves out of the player's island or the Happy Home Paradise DLC is purchased, in which either the player or Isabelle can reset the interior.",
        price: 250
      },
      {
        ownerId: 3,
        address: "281 Animal Crossing Rd",
        city: "Nookipedia",
        state: "AC",
        country: "Animal Crossing",
        lat: 11.7645358,
        lng: -65.4730327,
        name: "Judy's House",
        description: "Judy's house provides: Starry Garland, Wooden-Block Bed, Wooden-Block Table, Wooden-Block Wall Clock, Wooden-Block Bench, Wooden-Block Stool, Wooden-Block Chair, Wooden-Block Bookshelf, Old-Fashined Alarm Clock, Wooden-Block Chest, and Wooden-Block Stereo",
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
