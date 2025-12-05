const prisma = require('../config/prismaClient');
const ApiError = require('../utils/ApiError');

const getDestinations = async (req, res, next) => {
  try {
    const destinations = await prisma.destination.findMany({
      include: { universities: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      status: 'success',
      data: { destinations },
    });
  } catch (error) {
    next(error);
  }
};

const getDestinationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const destination = await prisma.destination.findUnique({
      where: { id },
      include: { universities: true },
    });

    if (!destination) {
      return next(new ApiError(404, 'Destination not found'));
    }

    res.json({
      status: 'success',
      data: { destination },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDestinations,
  getDestinationById,
};
