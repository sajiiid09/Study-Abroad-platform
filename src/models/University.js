const { Schema, model } = require('mongoose');

const UniversitySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    ranking: { type: Number },
    destinationId: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
  },
  { timestamps: true }
);

const University = model('University', UniversitySchema);

module.exports = University;
