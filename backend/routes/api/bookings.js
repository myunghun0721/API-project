// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


/* --------------------------------- */
router.get('/current', async (req, res) => {

  res.status(200)
  res.json({
    message: 'hello from bookings'
  })
})


module.exports = router;
