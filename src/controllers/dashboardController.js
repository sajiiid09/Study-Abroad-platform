const prisma = require('../config/prismaClient');
const ApiError = require('../utils/ApiError');

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
      recentEnrollments,
      recentApplications,
    ] = await Promise.all([
      prisma.enrollment.count({ where: { userId } }),
      prisma.enrollment.count({ where: { userId, status: { in: ['ACTIVE', 'COMPLETED'] } } }),
      prisma.application.count({ where: { userId } }),
      prisma.application.count({ where: { userId, status: { in: ['PENDING', 'UNDER_REVIEW'] } } }),
      prisma.consultationBooking.count({
        where: {
          userId,
          OR: [
            { preferredDate: { gt: now } },
            { status: 'SCHEDULED' },
          ],
        },
      }),
      prisma.enrollment.findMany({
        where: { userId },
        include: { course: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
      prisma.application.findMany({
        where: { userId },
        include: {
          university: {
            include: { destination: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
    ]);

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
