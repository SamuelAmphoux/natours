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

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourAndUserIds, createReview);
router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
