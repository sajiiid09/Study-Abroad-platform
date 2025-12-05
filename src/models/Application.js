const { Schema, model } = require('mongoose');

const applicationStatuses = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'];

const ApplicationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
    status: { type: String, enum: applicationStatuses, default: 'PENDING' },
    intendedIntake: { type: String },
    notes: { type: String },
    documents: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Application = model('Application', ApplicationSchema);

module.exports = Application;
