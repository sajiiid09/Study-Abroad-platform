const mongoose = require('mongoose');
const config = require('./env');

async function connectDB() {
  try {
    if (!config.databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    await mongoose.connect(config.databaseUrl);
    // eslint-disable-next-line no-console
    console.log('✅ MongoDB connected via Mongoose');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ MongoDB connection error', error);
    process.exit(1);
  }
}

module.exports = { connectDB };
