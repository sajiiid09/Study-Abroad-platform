const Destination = require('../models/Destination');
const University = require('../models/University'); // [Fix] Essential for population
const ApiError = require('../utils/ApiError');

const getDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find()
      .populate('universities')
      .sort({ createdAt: -1 });

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

    const destination = await Destination.findById(id).populate('universities');

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

// [CRITICAL] This exports the functions so the router can use them
module.exports = {
  getDestinations,
  getDestinationById,
};