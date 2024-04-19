const express = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
} = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/me', authController.protect, getAccount);
// // Without API option
// router.post('/submit-user-data', authController.protect, updateUserData);

router.use(authController.isLoggedIn);

router.get('/', getOverview);
router.get('/tour/:slug', getTour);
router.get('/login', getLoginForm);

module.exports = router;
