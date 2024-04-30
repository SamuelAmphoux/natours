const express = require('express');
const {
  getCheckoutSession,
  getBooking,
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, restrictTo } = require('../controllers/authController');

// "mergeParams: true" allows the id in the route /tour/:tourId/reviews
// to be accessible here
const router = express.Router();

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

router.use(restrictTo('admin', 'lead-guide'));

router.route('/').get(getAllBookings).post(createBooking);
router.route('/id').get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
