// src/models/Destination.js
const { Schema, model } = require('mongoose');

const DestinationSchema = new Schema(
  {
    // Country name, e.g. "United Kingdom"
    name: { type: String, required: true, trim: true },

    // Background / hero image for the destination card
    imageUrl: { type: String },

    // Country flag emoji or small icon, e.g. "🇬🇧"
    flag: { type: String },

    shortDescription: { type: String },

    universityCount: { type: Number }, // e.g., 120+
    costRange: { type: String },       // e.g., "$15,000 - $35,000/year"
    workPermitRules: { type: String }, // e.g., "20 hrs/week during studies"
    duration: { type: String },        // e.g., "3-4 years"

    // Bullet points shown in the UI
    highlights: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate for related universities
DestinationSchema.virtual('universities', {
  ref: 'University',
  localField: '_id',
  foreignField: 'destinationId',
});

module.exports = model('Destination', DestinationSchema);
