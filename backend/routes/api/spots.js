// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');

const router = express.Router();

const spotValidator = [
  check('address')
    .exists({ checkFalsy: true })
    .not()
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .not()
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .not()
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .not()
    .withMessage('Country is required'),
  check('lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be within -90 and 90'),
  check('lng')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be within -180 and 180'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Description is required'),
  check('price')
    .isInt({ min: 0 })
    .withMessage('Price per day must be a positive number')
    .isNumeric()
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

const reviewValidator = [
  check('review')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Review text is required'),
  check('stars')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

/* --------------------------------- */
router.post('/:spotId(\\d+)/reviews', requireAuth, reviewValidator, async (req, res) => {
  const { review, stars } = req.body;

  const spot = await Spot.findByPk(req.params.spotId, {
    include: {
      model: Review
    }
  })

  if (!spot) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found"
    })
  }

  // console.log(spot.Reviews)
  for (const user of spot.Reviews) {
    // console.log(user.userId)
    if (user.userId == req.user.id) {
      res.status(500)
      return res.json({
        "message": "User already has a review for this spot",
        // message: spot.Reviews[0].userId
      })
    }
  }
  const createReview = await Review.create({
    spotId: spot.id,
    userId: req.user.id,
    review,
    stars
  });


  res.status(201)
  res.json({
    id: createReview.id,
    spotId: createReview.spotId,
    userId: createReview.userId,
    review: createReview.review,
    stars: createReview.stars,
    createdAt: createReview.createdAt,
    updatedAt: createReview.updatedAt
  })
})
/* --------------------------------- */
router.get('/:spotId(\\d+)/reviews', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: {
      model: Review,
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }, {
        model: ReviewImage,
        attributes: ['id', 'url']
      }],
    }
  })

  if (!spot) {
    res.status(404),
      res.json({
        message: "Spot couldn't be found"
      })
  }
  res.json({
    Reviews: spot.Reviews
  })
})
/* --------------------------------- */
router.delete('/:spotId(\\d+)', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    where: {
      ownerId: req.user.id
    }
  })

  if (!spot) {
    res.status(404)
    res.json({
      message: "Spot couldn't be found"
    });
  }

  await spot.destroy();

  res.status(200)
  res.json({
    message: 'Successfully deleted'
  })
})

/* --------------------------------- */
router.put('/:spotId(\\d+)', requireAuth, spotValidator, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const spot = await Spot.findByPk(req.params.spotId, {
    where: {
      ownerId: req.user.id
    }
  })

  if (!spot) {
    res.status(404)
    res.json({
      message: "Spot couldn't be found"
    });
  }

  spot.address = address || spot.address
  spot.city = city || spot.city
  spot.state = state || spot.state
  spot.country = country || spot.country
  spot.lat = lat || spot.lat
  spot.lng = lng || spot.lng
  spot.name = name || spot.name
  spot.description = description || spot.description
  spot.price = price || spot.price

  res.status(200)
  res.json({
    ...spot.dataValues
    // address: spot.address,
    // city: spot.city,
    // state: spot.state,
    // country: spot.country,
    // lat: spot.lat,
    // lng: spot.lng,
    // name: spot.name,
    // description: spot.description,
    // price: spot.price
  })
})

/* --------------------------------- */
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { url, preview } = req.body
  const spot = await Spot.findByPk(req.params.spotId, {
    where: {
      ownerId: req.user.id,
    },
    include: {
      model: SpotImage,
      attributes: ['id']
    }
  })

  if (!spot) {
    res.status(404)
    res.json({
      message: "Spot couldn't be found"
    });
  };

  const createImage = await SpotImage.create({
    spotId: spot.id,
    url,
    preview
  });

  res.status(200)
  res.json([{
    id: createImage.id,
    url: createImage.url,
    preview: createImage.preview
  }])
})

/* --------------------------------- */
router.post('/', requireAuth, spotValidator, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const createSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });
  res.status(201)
  res.json({
    createSpot
  });

})

/* --------------------------------- */
router.get('/:spotId(\\d+)', async (req, res) => {
  const spots = await Spot.findByPk(req.params.spotId, {
    include: [{
      model: SpotImage,
      attributes: ['id', 'url', 'preview']
    }, {
      model: User,
    }]
  })

  if (!spots) {
    res.status(404)
    res.json({
      message: "Spot couldn't be found"
    });
  };

  spots.dataValues.Owner = spots.dataValues.User
  delete spots.dataValues.User

  res.json(spots)
})

/* --------------------------------- */
router.get('/current', requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      id: req.user.id
    },
    include: [
      {
        model: SpotImage,
        attributes: ['url'],
      }
    ],
  })

  for (const spot of spots) {
    const reviews = await Review.findAll({
      where: {
        spotId: spot.id
      }
    })

    let totalRating = 0;
    let total = 0;
    for (const review of reviews) {
      totalRating += review.stars;
      total++;
    }

    spot.dataValues.avgRating = totalRating / total;
  }

  spots.forEach(spot => {
    console.log('====>',spot.dataValues.SpotImages[0])
    if (spot.dataValues.SpotImages[0]) {
      spot.dataValues.previewImage = spot.SpotImages[0].url;
    }
    else {
      spot.dataValues.previewImage = 'No preview image';
    }

    // spot.dataValues.previewImage = spot.SpotImages[0].url || 'No preview image'
    delete spot.dataValues.SpotImages;
  })

  res.json({
    Spots: spots
  })
})

/* --------------------------------- */
router.get('/', async (req, res) => {

  let spots = await Spot.findAll({
    include: [
      {
        model: SpotImage,
        attributes: ['url'],
      }
    ],
  });

  for (const spot of spots) {
    const reviews = await Review.findAll({
      where: {
        spotId: spot.id
      }
    });

    let totalRating = 0;
    let total = 0;
    for (const review of reviews) {
      total++;
      totalRating += review.stars;
    }

    spot.dataValues.avgRating = totalRating / total;
  }



  spots.forEach(spot => {
    // console.log('==>', spot.SpotImages[0].dataValues.url)
    // spot.dataValues.previewImage = spot.SpotImages[0].dataValues.url || null
    const jsonSpot = spot.toJSON();
    // console.log(jsonSpot.SpotImages[0])
    if (jsonSpot.SpotImages[0]) {
      spot.dataValues.previewImage = jsonSpot.SpotImages[0].url;
    }
    else {
      spot.dataValues.previewImage = 'No preview image';
    }

    delete spot.dataValues.SpotImages;
  })

  res.json({
    Spots: spots
  })
})


module.exports = router;
