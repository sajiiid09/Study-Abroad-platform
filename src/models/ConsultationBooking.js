const { Schema, model } = require('mongoose');

const consultationStatuses = ['NEW', 'SCHEDULED', 'COMPLETED', 'CANCELLED'];

const ConsultationBookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String },
    message: { type: String },
    preferredDate: { type: Date },
    status: { type: String, enum: consultationStatuses, default: 'NEW' },
  },
  { timestamps: true }
);

const ConsultationBooking = model('ConsultationBooking', ConsultationBookingSchema);

module.exports = ConsultationBooking;
