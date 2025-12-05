const { Schema, model } = require('mongoose');

const DestinationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    imageUrl: { type: String },
    shortDescription: { type: String },
    universityCount: { type: Number },
    costRange: { type: String },
    workPermitRules: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

DestinationSchema.virtual('universities', {
  ref: 'University',
  localField: '_id',
  foreignField: 'destinationId',
});

const Destination = model('Destination', DestinationSchema);

module.exports = Destination;
