const mongoose = require('mongoose');
const config = require('./env');

async function connectDB() {
  try {
    if (!config.mongoUri) {
      throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(config.mongoUri);
    // eslint-disable-next-line no-console
    console.log('✅ MongoDB connected via Mongoose');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ MongoDB connection error', error);
    process.exit(1);
  }
}

module.exports = { connectDB };
