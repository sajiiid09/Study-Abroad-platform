const app = require('./app');
const { port } = require('./config/env');
const { connectDB } = require('./config/db');

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

startServer();
