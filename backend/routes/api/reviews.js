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
router.delete('/:reivewId(\\d+)', requireAuth, async (req,res)=>{
  const review = await Review.findByPk(req.params.reivewId, {
    where:{
      userId: req.user.id
    }
  })

  if(!review){
    res.status(404)
    res.json({
      "message": "Review couldn't be found"
    })
  }
  await review.destroy();
  res.status(200)
  res.json({
    "message": "Successfully deleted"
  })
})
router.put('/:reivewId(\\d+)', requireAuth, editreviewValidator, async (req,res)=>{
  const { review, stars } = req.body
  const editreview = await Review.findByPk(req.params.reivewId, {
    where: {
      userId : req.user.id
    },
  })

  if(!editreview){
    res.status(404)
    res.json({
      "message": "Review couldn't be found"
    })
  }
  editreview.review = review || editreview.review
  editreview.stars = stars || editreview.stars

  res.status(200)
  res.json({
    ...editreview.dataValues
  })
})
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const { url } = req.body
  const review = await Review.findByPk(req.params.reviewId, {
    where: {
      userId: req.user.id
    },
    include: {
      model: ReviewImage
    }
  })

  if (!review) {
    res.status(404)
    res.json({
      "message": "Review couldn't be found"
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
      id: req.user.id
    }
  })

  let r;
  for (r of Reviews) {
    r.toJSON()
  }
  console.log(Reviews)
  const spot = r.dataValues.Spot.dataValues
  spot.previewImage = spot.SpotImages[0].url || 'No preview image'
  delete spot.SpotImages

  res.status(200)
  res.json({
    Reviews
  })
})


module.exports = router;
