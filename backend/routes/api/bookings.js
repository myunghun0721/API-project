// backend/routes/api/users.js
const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const bookingValidator = [
  check('startDate')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .custom(async (value, req)  => {
      const body = req.req.body
      if(body.startDate == body.endDate){
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
      if(body.startDate == body.endDate){
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

router.put('/:bookingId', requireAuth, bookingValidator, async (req, res) => {
  let { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(req.params.bookingId);
  if (!booking) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found"
    })
  }

  // console.log(booking.userId)
  // console.log(req.user.id)
  if (booking.userId !== req.user.id) {
    res.status(403)
    return res.json({
      message: 'Booking must belong to the current user'
    })
  }

  // const currentDate = new Date();
  startDate = new Date(startDate)
  endDate = new Date(endDate)

  const checkBooking = await Booking.findOne({
    where: {
      spotId: booking.spotId,
      [Op.or]: [
        {
          [Op.and]: [{ startDate: { [Op.lte]: startDate } }, { endDate: { [Op.gte]: startDate } }],
        },
        {
          [Op.and]: [{ startDate: { [Op.lte]: endDate } }, { endDate: { [Op.gte]: endDate } }],
        },
        {
          [Op.and]: [{ startDate: { [Op.lte]: startDate } }, { endDate: { [Op.lte]: endDate } }],
        },
        {
          [Op.and]: [{ startDate: { [Op.lte]: startDate } }, { endDate: { [Op.gte]: endDate } }],
        },
      ],

    }
  })

  if (checkBooking) {
    res.status(403)
    return res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    })
  }

  booking.startDate = startDate || booking.startDate
  booking.endDate = endDate || booking.endDate

  await booking.save();

  res.status(200)
  res.json({
    ...booking.dataValues
  })
})
/* --------------------------------- */
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId, {
    include: {
      model: Spot
    }
  })

  if (!booking) {
    res.status(404)
    return res.json({
      "message": "Booking couldn't be found"
    })
  }
  console.log('booking user id: ', booking.userId)
  console.log('user id: ', req.user.id)
  if (booking.userId !== req.user.id && booking.dataValues.Spot.dataValues.ownerId !== req.user.id) {
    res.status(403)
    return res.json({
      message: 'Booking must belong to the current user or the Spot must belong to the current user'
    })
  }

  const currentDate = new Date();
  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  if (currentDate > startDate && currentDate < endDate) {
    res.status(403)
    return res.json({
      "message": "Bookings that have been started can't be deleted"
    });
  }

  if (booking.userId !== req.user.id) {
    res.status(403)
    return res.json({
      message: 'Booking must belong to the current user'
    });
  }
  await booking.destroy();

  res.status(200)
  res.json({
    "message": "Successfully deleted"
  })
})

/* --------------------------------- */
router.get('/current', requireAuth, async (req, res) => {
  const Bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'description']
        },
        include: {
          model: SpotImage,
          attributes: ['url']
        }
      }
    ]
  });

  let booking;
  for (booking of Bookings) {
    booking.toJSON()
    const spot = booking.dataValues.Spot.dataValues
    if (spot.SpotImages.length >= 1) {
      spot.previewImage = spot.SpotImages[0].url;
    }
    else {
      spot.previewImage = 'No preview image';
    }
    delete spot.SpotImages
  }
  // console.log(booking)
  // const spot = booking.dataValues.Spot.dataValues
  // spot.previewImage = spot.SpotImages[0].url || 'No preview image'

  res.status(200)
  res.json({
    Bookings
  })
})


module.exports = router;
