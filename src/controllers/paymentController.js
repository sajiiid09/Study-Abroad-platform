const Enrollment = require('../models/Enrollment');

const getMyPayments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({
      userId: req.user.id,
      paymentStatus: { $ne: 'NOT_REQUIRED' },
    })
      .populate('courseId')
      .sort({ createdAt: -1 });

    const payments = enrollments.map((enrollment) => {
      const obj = enrollment.toObject({ virtuals: true });
      const course = obj.courseId || null;
      const methodGuess = obj.paymentMethod?.toLowerCase?.() || obj.paymentReference?.toLowerCase?.() || '';

      return {
        _id: obj._id,
        amount: course?.price || 0,
        status: obj.paymentStatus,
        paymentReference: obj.paymentReference,
        method: methodGuess.includes('bkash')
          ? 'bkash'
          : methodGuess.includes('stripe')
            ? 'stripe'
            : obj.paymentMethod || 'demo',
        course: course
          ? {
              _id: course._id,
              title: course.title,
              category: course.category,
              price: course.price,
            }
          : null,
        createdAt: obj.createdAt,
      };
    });

    res.json({
      status: 'success',
      data: { payments },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyPayments,
};
