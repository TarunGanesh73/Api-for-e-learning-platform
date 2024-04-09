const express = require('express');
const enrollController = require('../controller/enrollController');
const authController = require('./../controller/authController');

const router = express.Router();

router
  .route('/enrollCourse')
  .post(authController.protect, enrollController.enroll);
router
  .route('/enrolledCourse/:id')
  .get(authController.protect, enrollController.enrolledCourses);

module.exports = router;
