const mongoose = require('mongoose');
const validator = require('validator');
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A course must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A course name must have less or equal than 40 characters',
      ],
      minlength: [
        10,
        'A course name must have greater or equal than 10 characters',
      ],
    },
    duration: {
      type: Number,
      required: [true, 'A course must have a duration'],
    },
    entrollments: {
      type: Number,
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert'],
    },
    popularity: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'A course must have a price'],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A course must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    images: [String],
  },
  { versionKey: false }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
