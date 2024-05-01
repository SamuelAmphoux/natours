const express = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getSignupForm,
  getAccount,
  getMyTours,
} = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/me', authController.protect, getAccount);
router.get('/my-tours', authController.protect, getMyTours);

router.use(authController.isLoggedIn);

router.get('/', bookingController.createBookingCheckout, getOverview);
router.get('/tour/:slug', getTour);
router.get('/login', getLoginForm);
router.get('/signup', getSignupForm);

module.exports = router;
