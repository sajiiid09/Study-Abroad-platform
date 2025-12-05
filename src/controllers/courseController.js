const Course = require('../models/Course');
const ApiError = require('../utils/ApiError');

const getCourses = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });

    res.json({
      status: 'success',
      data: { courses },
    });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new ApiError(404, 'Course not found'));
    }

    res.json({
      status: 'success',
      data: { course },
    });
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, price, category, instructorName, thumbnailUrl } = req.body;

    if (!title || !price || !category) {
      return next(new ApiError(400, 'Title, price, and category are required'));
    }

    const course = await Course.create({
      title,
      description: description || '',
      price,
      category,
      instructorName: instructorName || 'Instructor',
      thumbnailUrl: thumbnailUrl || null,
    });

    res.status(201).json({
      status: 'success',
      message: 'Course created',
      data: { course },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
};
