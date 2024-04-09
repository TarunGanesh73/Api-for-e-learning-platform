const User = require('./../model/userModel');
const Course = require('./../model/courseModel');
const AppError = require('./../utilis/appError');
const catchAsync = require('./../utilis/catchAsync');

exports.enroll = catchAsync(async (req, res, next) => {
  const { userId, courseId } = req.body;

  const user = await User.findById(userId);
  const course = await Course.findById(courseId);

  if (!user || !course) {
    return next(new AppError(`Can't find the user nor Course`, 400));
  }

  // Check if the user is already enrolled in the course
  if (user.enrolledCourses.includes(courseId)) {
    return next(new AppError(`Your already enrolled to course`, 400));
  }

  // Enroll the user in the course
  user.enrolledCourses.push(courseId);
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'your successfully enrolled to the course',
  });
});

exports.enrolledCourses = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).populate('enrolledCourses');

  if (!user) {
    return next(new AppError('User not found', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      courses: user.enrolledCourses,
    },
  });
});
