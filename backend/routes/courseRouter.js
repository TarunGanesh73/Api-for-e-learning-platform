const express = require('express');
const courseController = require('./../controller/courseController');
const authController = require('./../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, courseController.getAllCourse)
  .post(
    authController.protect,
    authController.restrictTo('superadmin'),
    courseController.createCourse
  );

router
  .route('/:id')
  .get(authController.protect, courseController.getCourse)
  .patch(
    authController.protect,
    authController.restrictTo('superadmin'),
    courseController.updateCourse
  )
  .delete(
    authController.protect,
    authController.restrictTo('superadmin'),
    courseController.deleteCourse
  );

module.exports = router;
