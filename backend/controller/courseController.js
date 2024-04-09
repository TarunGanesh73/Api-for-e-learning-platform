const Course = require('./../model/courseModel');
const APIFeatures = require('./../utilis/apiFeatures');
const catchAsync = require('./../utilis/catchAsync');
const AppError = require('./../utilis/appError');

exports.getAllCourse = async (req, res, next) => {
  // BUILD QUERY

  const features = new APIFeatures(Course.find(), req.query)
    .filter()
    .pagination();

  const courses = await features.query;

  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses,
    },
  });
};

exports.createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await Course.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      course: newCourse,
    },
  });
});

exports.getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('No course found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      course,
    },
  });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      course,
    },
  });
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: `Course is successfully deleted`,
  });
});
