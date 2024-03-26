const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  // checkId,
  // checkBody,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

// Middleware to check id validity (unecessary after schema implementation)
// router.param('id', checkId);

router.route('/top-5-tours').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(authController.protect, getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour,
  );

module.exports = router;
