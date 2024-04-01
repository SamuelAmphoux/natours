const express = require('express');
const {
  getAllReviews,
  createReview,
  getReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

// "mergeParams: true" allows the id in the route /tour/:tourId/reviews
// to be accessible here
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(protect, getAllReviews)
  .post(protect, restrictTo('user'), createReview);
router.route('/:id').get(protect, getReview).delete(protect, deleteReview);

module.exports = router;
