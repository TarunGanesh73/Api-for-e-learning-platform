const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router
  .route('/userProfile/:id')
  .post(userController.uploadPhoto, userController.userProfile);

module.exports = router;
