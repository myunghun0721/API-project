// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const editreviewValidator = [
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
router.delete('/:reivewId(\\d+)', requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reivewId, {
    where: {
      userId: req.user.id
    }
  })

  if (!review) {
    res.status(404)
    return res.json({
      "message": "Review couldn't be found"
    })
  }

  if (review.userId !== req.user.id) {
    res.status(403)
    return res.json({
      message: 'Review must belong to the current user'
    });
  }
  await review.destroy();

  res.status(200)
  res.json({
    "message": "Successfully deleted"
  })
})
/* --------------------------------- */
router.put('/:reivewId(\\d+)', requireAuth, editreviewValidator, async (req, res) => {
  const { review, stars } = req.body
  const editreview = await Review.findByPk(req.params.reivewId, {
    where: {
      userId: req.user.id
    },
  })

  if (!editreview) {
    res.status(404)
    return res.json({
      "message": "Review couldn't be found"
    })
  }
  if (editreview.userId !== req.user.id) {
    res.status(403)
    return res.json({
      message: 'Review must belong to the current user'
    })
  }

  editreview.review = review || editreview.review
  editreview.stars = stars || editreview.stars
  await editreview.save();
  res.status(200)
  res.json({
    ...editreview.dataValues
  })
})
/* --------------------------------- */
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const { url } = req.body

  const review = await Review.findByPk(5000, {
    where: {
      userId: req.user.id
    },
    include: {
      model: ReviewImage
    }
  })

  if (!review) {
    res.status(404)
    return res.json({
      "message": "Review couldn't be found"
    })
  }
  if (review.userId !== req.user.id) {
    res.status(403)
    res.json({
      message: 'Review must belong to the current user'
    })
  }



  if (review.ReviewImages.length >= 10) {
    res.status(403)
    return res.json({
      "message": "Maximum number of images for this resource was reached"
    });
  };

  const createReviewImage = await ReviewImage.create({
    reviewId: review.id,
    url
  })
  res.status(200)
  res.json({
    id: createReviewImage.id,
    url
  })
})
/* --------------------------------- */
router.get('/current', requireAuth, async (req, res) => {
  const Reviews = await Review.findAll({
    include: [{
      model: User,
      attributes: ['id', 'firstName', 'lastName']
    },
    {
      model: Spot,
      include: SpotImage,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'description']
      }
    },
    {
      model: ReviewImage,
      attributes: ['id', 'url']
    }
    ],
    where: {
      userId: req.user.id
    }
  })

  let r;
  for (r of Reviews) {
    r.toJSON()
    const spot = r.dataValues.Spot.dataValues
    if (spot.SpotImages.length >= 1) {
      spot.previewImage = spot.SpotImages[0].url;
    }
    else {
      spot.previewImage = 'No preview image';
    }
    const review = r.dataValues
    // review.temp = []

    for (reviewimg of review.ReviewImages) {
      const result = reviewimg.toJSON()
      // review.temp.push(result)

    }
    if (review.ReviewImages.length <= 0) {
      review.ReviewImages = 'No preview review image';
    }
    // if (review.ReviewImages.length >= 1) {



    //   // review.ReviewImages = review.ReviewImages[0].url;
    // }
    // else {
    //   review.ReviewImages = 'No preview review image';
    // }


    delete spot.SpotImages
  }
  // if (spot.SpotImages.length) {
  //   spot.dataValues.previewImage = spot.SpotImages[0].url;
  // }
  // else {
  //   spot.previewImage = 'No preview image';
  // }
  // // spot.previewImage = spot.SpotImages[0].url || 'No preview image'

  res.status(200)
  res.json({
    Reviews
  })
})


module.exports = router;
