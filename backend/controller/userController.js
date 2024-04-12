const User = require('./../model/userModel');
const cloudinary = require('cloudinary').v2;
const upload = require('./../middleware/multer');
const catchAsync = require('./../utilis/catchAsync');

exports.uploadPhoto = upload.single('photo');

exports.userProfile = async (req, res, next) => {
  const getUser = await User.findById(req.params.id)
    .select('-enrolledCourses')
    .select('-role');

  getUser.set(req.body);

  if (req.file) {
    const photoPath = req.file.path;
    getUser.photo = photoPath;
  }

  if (!getUser.isModified()) {
    return res.status(200).json({
      status: 'success',
      data: {
        user: getUser,
      },
    });
  }

  const updatedUser = await getUser.save();

  res.status(201).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
};
