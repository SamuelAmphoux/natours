const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! TERMINATING');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => {
  // eslint-disable-next-line no-console
  console.log('DB connection successful!');
});

const app = require('./app');

// console.log(process.env);

// Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}`);
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! TERMINATING');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
