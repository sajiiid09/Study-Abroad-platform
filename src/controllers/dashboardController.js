const Enrollment = require('../models/Enrollment');
const Application = require('../models/Application');
const ConsultationBooking = require('../models/ConsultationBooking');

const getOverview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const [
      totalEnrollments,
      activeEnrollments,
      totalApplications,
      pendingApplications,
      upcomingConsultations,
      recentEnrollmentsRaw,
      recentApplicationsRaw,
    ] = await Promise.all([
      Enrollment.countDocuments({ userId }),
      Enrollment.countDocuments({ userId, status: { $in: ['ACTIVE', 'COMPLETED'] } }),
      Application.countDocuments({ userId }),
      Application.countDocuments({ userId, status: { $in: ['PENDING', 'UNDER_REVIEW'] } }),
      ConsultationBooking.countDocuments({
        userId,
        $or: [
          { preferredDate: { $gt: now } },
          { status: 'SCHEDULED' },
        ],
      }),
      Enrollment.find({ userId })
        .populate('courseId')
        .sort({ createdAt: -1 })
        .limit(3),
      Application.find({ userId })
        .populate({
          path: 'universityId',
          populate: { path: 'destinationId', model: 'Destination' },
        })
        .sort({ createdAt: -1 })
        .limit(3),
    ]);

    const recentEnrollments = recentEnrollmentsRaw.map((enrollment) => {
      const obj = enrollment.toObject({ virtuals: true });
      if (obj.courseId) {
        obj.course = obj.courseId;
        delete obj.courseId;
      }
      return obj;
    });

    const recentApplications = recentApplicationsRaw.map((application) => {
      const obj = application.toObject({ virtuals: true });
      if (obj.universityId) {
        obj.university = obj.universityId;
        delete obj.universityId;
      }
      return obj;
    });

    res.json({
      status: 'success',
      data: {
        stats: {
          totalEnrollments,
          activeEnrollments,
          totalApplications,
          pendingApplications,
          upcomingConsultations,
        },
        recentEnrollments,
        recentApplications,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview,
};
