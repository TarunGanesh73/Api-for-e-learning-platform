const User = require('./../model/userModel');
const cloudinary = require('cloudinary').v2;
const upload = require('./../middleware/multer');
const catchAsync = require('./../utilis/catchAsync');

exports.uploadPhoto = upload.single('photo');

exports.userProfile = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);

    getUser.set(req.body);

    if (req.file) {
      const photoPath = req.file.path;
      getUser.photo = photoPath;
    }

    if (!getUser.isModified()) {
      return res.status(201).json({
        status: 'success',
        data: {
          user: getUser,
        },
      });
    }

    const updatedUser = await getUser.save();

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
