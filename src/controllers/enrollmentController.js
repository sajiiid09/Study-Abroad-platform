const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const ApiError = require('../utils/ApiError');

const initiateEnrollment = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return next(new ApiError(400, 'Course ID is required'));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new ApiError(404, 'Course not found'));
    }

    const existing = await Enrollment.findOne({
      userId: req.user.id,
      courseId,
      status: { $in: ['ACTIVE', 'COMPLETED'] },
    });

    if (existing) {
      return next(new ApiError(400, 'You are already enrolled in this course'));
    }

    const enrollment = await Enrollment.create({
      userId: req.user.id,
      courseId,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      paymentReference: null,
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

    const enrollment = await Enrollment.findById(id);

    if (!enrollment) {
      return next(new ApiError(404, 'Enrollment not found'));
    }

    if (enrollment.userId.toString() !== req.user.id) {
      return next(new ApiError(403, 'You are not allowed to modify this enrollment'));
    }

    if (['ACTIVE', 'COMPLETED'].includes(enrollment.status)) {
      return next(new ApiError(400, 'Payment already confirmed for this enrollment'));
    }

    const reference =
      (paymentMethod ? `${paymentMethod}-` : '') + (transactionId || `DEMO-${Date.now()}`);

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      id,
      {
        status: 'ACTIVE',
        paymentStatus: 'PAID',
        paymentReference: reference,
      },
      { new: true }
    );

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
    const enrollmentsRaw = await Enrollment.find({ userId: req.user.id })
      .populate('courseId')
      .sort({ createdAt: -1 });

    const enrollments = enrollmentsRaw.map((enrollment) => {
      const obj = enrollment.toObject({ virtuals: true });
      if (obj.courseId) {
        obj.course = obj.courseId;
        delete obj.courseId;
      }
      return obj;
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
    const enrollment = await Enrollment.findById(id);

    if (!enrollment) {
      return next(new ApiError(404, 'Enrollment not found'));
    }

    if (enrollment.userId.toString() !== req.user.id) {
      return next(new ApiError(403, 'You are not allowed to modify this enrollment'));
    }

    if (enrollment.status !== 'PENDING' || enrollment.paymentStatus !== 'PENDING') {
      return next(new ApiError(400, 'Only pending enrollments can be cancelled'));
    }

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      id,
      {
        status: 'CANCELLED',
        paymentStatus: 'FAILED',
      },
      { new: true }
    );

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
