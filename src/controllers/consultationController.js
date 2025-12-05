const ConsultationBooking = require('../models/ConsultationBooking');
const ApiError = require('../utils/ApiError');

const createConsultation = async (req, res, next) => {
  try {
    const { name, email, phone, message, preferredDate } = req.body;

    if (!name || !email) {
      return next(new ApiError(400, 'Name and email are required'));
    }

    const consultation = await ConsultationBooking.create({
      name,
      email,
      phone: phone || null,
      message: message || null,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
      userId: req.user ? req.user.id : null,
    });

    res.status(201).json({
      status: 'success',
      message: 'Consultation request submitted',
      data: { consultation },
    });
  } catch (error) {
    next(error);
  }
};

const getMyConsultations = async (req, res, next) => {
  try {
    const consultations = await ConsultationBooking.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.json({
      status: 'success',
      data: { consultations },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConsultation,
  getMyConsultations,
};
