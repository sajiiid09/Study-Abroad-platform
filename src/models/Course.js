// src/models/Course.js
const { Schema, model } = require('mongoose');

// Updated to match frontend "categories" / filters
const courseCategories = ['Language', 'Test Prep', 'Academic', 'Counseling', 'Other'];

const CourseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },

    // Used for filtering in the frontend
    category: { type: String, enum: courseCategories, required: true },

    // Maps to frontend 'image' field
    thumbnailUrl: { type: String },

    instructorName: { type: String, default: 'Expert Instructor' },
    rating: { type: Number, default: 4.5 },

    // New fields to align with frontend UI
    duration: { type: String, default: '8 weeks' }, // e.g., "8 weeks"
    studentCount: { type: Number, default: 0 }, // Maps to 'students' in cards

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model('Course', CourseSchema);
