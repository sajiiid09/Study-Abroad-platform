const { Schema, model } = require('mongoose');

const courseCategories = ['IELTS', 'TOEFL', 'GRE', 'SPOKEN_ENGLISH', 'OTHER'];

const CourseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    category: { type: String, enum: courseCategories, required: true },
    thumbnailUrl: { type: String },
    instructorName: { type: String, default: 'Instructor' },
    rating: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Course = model('Course', CourseSchema);

module.exports = Course;
