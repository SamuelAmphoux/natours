const express = require('express');
const {
  getAllReviews,
  createReview,
  getReview,
  deleteReview,
  updateReview,
  setTourAndUserIds,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

// "mergeParams: true" allows the id in the route /tour/:tourId/reviews
// to be accessible here
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(protect, getAllReviews)
  .post(protect, restrictTo('user'), setTourAndUserIds, createReview);
router
  .route('/:id')
  .get(protect, getReview)
  .patch(updateReview)
  .delete(protect, deleteReview);

module.exports = router;
