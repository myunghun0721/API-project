// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


/* --------------------------------- */
router.delete('/:imageId', requireAuth, async (req, res) => {
  const image = await SpotImage.findByPk(req.params.imageId, {
    where: {
      ownerId: req.user.id,
    },
    include: {
      model: Spot
    }

  });

  if (!image) {
    res.status(404)
    return res.json({
      "message": "Spot Image couldn't be found"
    })
  }

  if (image.Spot.ownerId !== req.user.id) {
    res.status(403)
    return res.json({
      message: 'Spot must belong to the current user'
    })
  }

  await image.destroy()

  res.status(200)
  res.json({
    "message": "Successfully deleted"
  })
})

module.exports = router;
