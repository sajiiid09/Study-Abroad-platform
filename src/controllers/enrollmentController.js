const prisma = require('../config/prismaClient');
const ApiError = require('../utils/ApiError');

const initiateEnrollment = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return next(new ApiError(400, 'Course ID is required'));
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!course) {
      return next(new ApiError(404, 'Course not found'));
    }

    const existing = await prisma.enrollment.findFirst({
      where: {
        userId: req.user.id,
        courseId,
        status: { in: ['ACTIVE', 'COMPLETED'] },
      },
    });

    if (existing) {
      return next(new ApiError(400, 'You are already enrolled in this course'));
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: req.user.id,
        courseId,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentReference: null,
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Enrollment initiated. Please complete payment for demo.',
      data: { enrollment },
    });
  } catch (error) {
    next(error);
  }
};

const confirmPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { paymentMethod, transactionId } = req.body;

    const enrollment = await prisma.enrollment.findUnique({ where: { id } });

    if (!enrollment) {
      return next(new ApiError(404, 'Enrollment not found'));
    }

    if (enrollment.userId !== req.user.id) {
      return next(new ApiError(403, 'You are not allowed to modify this enrollment'));
    }

    if (['ACTIVE', 'COMPLETED'].includes(enrollment.status)) {
      return next(new ApiError(400, 'Payment already confirmed for this enrollment'));
    }

    const reference =
      (paymentMethod ? `${paymentMethod}-` : '') + (transactionId || `DEMO-${Date.now()}`);

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        status: 'ACTIVE',
        paymentStatus: 'PAID',
        paymentReference: reference,
      },
    });

    res.json({
      status: 'success',
      message: 'Payment confirmed for demo. Enrollment is now active.',
      data: { enrollment: updatedEnrollment },
    });
  } catch (error) {
    next(error);
  }
};

const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user.id },
      include: { course: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      status: 'success',
      data: { enrollments },
    });
  } catch (error) {
    next(error);
  }
};

const cancelEnrollment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enrollment = await prisma.enrollment.findUnique({ where: { id } });

    if (!enrollment) {
      return next(new ApiError(404, 'Enrollment not found'));
    }

    if (enrollment.userId !== req.user.id) {
      return next(new ApiError(403, 'You are not allowed to modify this enrollment'));
    }

    if (enrollment.status !== 'PENDING' || enrollment.paymentStatus !== 'PENDING') {
      return next(new ApiError(400, 'Only pending enrollments can be cancelled'));
    }

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        paymentStatus: 'FAILED',
      },
    });

    res.json({
      status: 'success',
      message: 'Enrollment cancelled',
      data: { enrollment: updatedEnrollment },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  initiateEnrollment,
  confirmPayment,
  getMyEnrollments,
  cancelEnrollment,
};
