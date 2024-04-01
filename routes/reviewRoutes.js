const express = require('express');
const {
  getAllReviews,
  createReview,
  getReview,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(protect, getAllReviews)
  .post(protect, restrictTo('user'), createReview);
router.route('/:id').get(protect, getReview);

module.exports = router;
