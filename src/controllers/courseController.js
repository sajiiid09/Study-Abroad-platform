const prisma = require('../config/prismaClient');
const ApiError = require('../utils/ApiError');

const getCourses = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const where = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

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

    const course = await prisma.course.findUnique({ where: { id } });

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

    const course = await prisma.course.create({
      data: {
        title,
        description: description || '',
        price,
        category,
        instructorName: instructorName || 'Instructor',
        thumbnailUrl: thumbnailUrl || null,
      },
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
