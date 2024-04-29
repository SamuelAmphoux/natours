const express = require('express');
const { getCheckoutSession } = require('../controllers/bookingController');
const { protect, restrictTo } = require('../controllers/authController');

// "mergeParams: true" allows the id in the route /tour/:tourId/reviews
// to be accessible here
const router = express.Router();

router.get('/checkout-session/:tourId', protect, getCheckoutSession);

module.exports = router;
