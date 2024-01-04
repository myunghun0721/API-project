// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


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
  // console.log(booking.dataValues.Spot.dataValues)
  if (booking.userId == req.user.id || booking.dataValues.Spot.dataValues.ownerId == req.user.id) {
    res.status(403)
    return res.json({
      message: 'Booking must belong to the current user or the Spot must belong to the current user'
    })
  }

  const currentDate = new Date();
  const startDate = new Date(booking.startDate);
  if (currentDate > startDate) {
    res.status(403)
    return res.json({
      "message": "Bookings that have been started can't be deleted"
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
  }
  // console.log(booking)
  const spot = booking.dataValues.Spot.dataValues
  spot.previewImage = spot.SpotImages[0].url || 'No preview image'
  delete spot.SpotImages

  res.status(200)
  res.json({
    Bookings
  })
})


module.exports = router;
