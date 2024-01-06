// backend/routes/api/users.js
const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

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
const bookingValidator = [
  check('startDate')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .custom(async (value, req) => {
      const body = req.req.body
      if (body.startDate == body.endDate) {
        throw new Error("Start date and endDate cannot be the same")
      }
      const startDate = new Date(body.startDate)
      const endDate = new Date(body.endDate)
      const currentDate = new Date()
      if (currentDate > startDate) throw new Error("startDate cannot be in the past")
    }),
  check('endDate')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .custom(async (value, req) => {
      // console.log('====>',req.req.body)
      const body = req.req.body
      if (body.startDate == body.endDate) {
        throw new Error("Start date and endDate cannot be the same")
      }
      const startDate = new Date(body.startDate)
      const endDate = new Date(body.endDate)
      // console.log('====>', startDate)
      // console.log('====>', endDate)
      if (startDate >= endDate) {
        throw new Error("endDate cannot be on or before startDate")
      }
      // const endDate = new Date(value)
      // const currentDate = new Date()
      // if (currentDate > inputDate) throw new Error("startDate cannot be in the past")
    }),
  handleValidationErrors
];

const pageValidator = [
  check('page')
    .custom(async value => {
      if (value < 1) {
        throw new Error('Page must be greater than or equal to 1');
      }
      if (value > 10) {
        throw new Error('Page must be less than or equal to 10');
      }
    }),
  check('size')
    .custom(async value => {
      if (value < 1) {
        throw new Error('Size must be greater than or equal to 1');
      }
      if (value > 20) {
        throw new Error('Size must be less than or equal to 20');
      }
    }),
  check('maxLat')
    .isFloat({ max: 90 })
    .withMessage('Maximum latitude is invalid')
    .optional(),

  check('minLat')
    .isFloat({ min: -90 })
    .withMessage('Minimum latitude is invalid')
    .optional(),

  check('minLng')
    .isFloat({ min: -180 })
    .withMessage('Minimum longitude is invalid')
    .optional(),

  check('maxLng')
    .isFloat({ max: 180 })
    .withMessage('Maximum longitude is invalid')
    .optional(),

  check('minPrice')
    .isInt({ min: 0 })
    .withMessage('Minimum price must be greater than or equal to 0')
    .optional(),

  check('maxPrice')
    .isInt({ min: 0 })
    .withMessage('Maximum price must be greater than or equal to 0')
    .optional(),
  handleValidationErrors
];

/* --------------------------------- */
router.post('/:spotId(\\d+)/bookings', requireAuth, bookingValidator, async (req, res) => {
  let { startDate, endDate } = req.body
  const booking = await Spot.findByPk(req.params.spotId)

  if (!booking) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found"
    })
  }

  if (booking.ownerId === req.user.id) {
    res.status(403)
    return res.json({
      message: 'Spot must NOT belong to the current user'
    })
  }

  // const currentDate = new Date();
  startDate = new Date(startDate)
  endDate = new Date(endDate)

  const checkBooking = await Booking.findOne({
    where: {
      spotId: req.params.spotId,
      [Op.or]: [
        { startDate: { [Op.between]: [startDate, endDate] } },
        { endDate: { [Op.between]: [startDate, endDate] } },
        {
          [Op.and]: [
            { startDate: { [Op.lte]: startDate } },
            { endDate: { [Op.gte]: endDate } }
          ]
        }
      ]

    }
  })

  if (checkBooking.length > 0) {
    res.status(403)
    return res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    });
  }

  const createBooking = await Booking.create({
    spotId: req.params.spotId,
    userId: req.user.id,
    startDate,
    endDate
  });


  res.status(200)
  res.json({
    ...createBooking.dataValues,
    // message: checkBooking
  })
})
/* --------------------------------- */
router.get('/:spotId(\\d+)/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found"
    })
  }

  let isOwner;
  if (spot.ownerId === req.user.id) {
    // console.log('Owner of the spot')
    isOwner = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    })
  }
  else {
    // console.log('NOT owner of the spot')
    isOwner = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })
  }

  res.status(200)
  res.json({
    Bookings: isOwner
  })
})
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
    return res.json({
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
    res.status(404)
    return res.json({
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
    return res.json({
      message: "Spot couldn't be found"
    });
  }
  if (spot.ownerId !== req.user.id) {
    res.status(403)
    return res.json({
      message: 'Spot must belong to the current user'
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
    return res.json({
      message: "Spot couldn't be found"
    });
  }
  if (spot.ownerId !== req.user.id) {
    res.status(403)
    return res.json({
      message: 'Spot must belong to the current user'
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

  await spot.save()

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
    return res.json({
      message: "Spot couldn't be found"
    });
  };

  if (spot.ownerId !== req.user.id) {
    res.status(403)
    return res.json({
      message: 'Spot must belong to the current user'
    })
  }

  const createImage = await SpotImage.create({
    spotId: spot.id,
    url,
    preview
  });

  res.status(200)
  res.json({
    id: createImage.id,
    url: createImage.url,
    preview: createImage.preview
  })
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
    ...createSpot.dataValues
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
    return res.json({
      message: "Spot couldn't be found"
    });
  };

  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    }
  });

  let total = 0;
  for (const review of reviews) {
    total++;
  }

  spots.dataValues.numReviews = total
  spots.dataValues.Owner = spots.dataValues.User
  delete spots.dataValues.User
  delete spots.dataValues.Owner.dataValues.username
  res.json(
    spots
  )
})

/* --------------------------------- */
router.get('/current', requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id
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
    // console.log('====>', spot.dataValues.SpotImages[0])
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
router.get('/', pageValidator, async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

  page = parseInt(page);
  size = parseInt(size);
  minPrice = parseInt(minPrice);
  maxPrice = parseInt(maxPrice);
  minLat = parseInt(minLat);
  maxLat = parseInt(maxLat);
  minLng = parseInt(minLng);
  maxLng = parseInt(maxLng);

  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(size)) size = 20;

  // console.log('============>', minLat, maxLat, minLng, maxLng)
  const pagination = {}

  pagination.limit = size
  pagination.offset = size * (page - 1);

  const option = {}
  if (minPrice && maxPrice) {
    option.price = { [Op.between]: [minPrice, maxPrice] };
  }
  else if (minPrice && !maxPrice) {
    option.price = { [Op.gte]: minPrice }
  }
  else if (!minPrice && maxPrice) {
    option.price = { [Op.lte]: maxPrice }
  }

  if (minLat && maxLat) {
    option.lat = { [Op.between]: [minLat, maxLat] };
  }
  else if (minLat && !maxLat) {
    option.lat = { [Op.gte]: minLat }
  }
  else if (!minLat && maxLat) {
    option.lat = { [Op.lte]: maxLat }
  }
  else if (minLat === maxLat) {
    option.lat = { [Op.eq]:  minLat}
  }

  if (minLng && maxLng) {
    option.lng = { [Op.between]: [minLng, maxLng] };
  }
  else if (minLng && !maxLng) {
    option.lng = { [Op.gte]: minLng }
  }
  else if (!minLng && maxLng) {
    option.lng = { [Op.lte]: maxLng }
  }
  else if (minLng === maxLng) {
    option.lng = { [Op.eq]:  minLng}
  }
  // console.log('====>', option)

  let spots = await Spot.findAll({
    where: option,
    ...pagination,
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

  for(const spot of spots){
    spot.toJSON()
    // console.log(typeof spot.price)
    spot.price = parseFloat(spot.price)
    spot.lat = parseFloat(spot.lat)
    spot.lng = parseFloat(spot.lng)
    // console.log(typeof spot.price)
  }
  res.json({
    Spots: spots,
    page,
    size,
    // type: typeof spots[0].lat
  })
})


module.exports = router;
