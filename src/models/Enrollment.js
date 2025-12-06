const { Schema, model } = require('mongoose');

const enrollmentStatuses = ['PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED'];
const paymentStatuses = ['NOT_REQUIRED', 'PENDING', 'PAID', 'FAILED'];

const EnrollmentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    status: { type: String, enum: enrollmentStatuses, default: 'PENDING' },
    paymentStatus: { type: String, enum: paymentStatuses, default: 'NOT_REQUIRED' },
    paymentMethod: { type: String, default: null },
    paymentReference: { type: String },
  },
  { timestamps: true }
);

const Enrollment = model('Enrollment', EnrollmentSchema);

module.exports = Enrollment;
