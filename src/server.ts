import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Mongoose app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// unhandledRejection --> asynchronous
process.on("unhandledRejection", () => {
  console.log(`😒 unhandledRejection is detected. Shutting down ...........`);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
    process.exit(1)
  }
});

// uncaughtRejection --> synchronous
process.on('uncaughtException', () => {
  console.log(`🤔uncaughtException is detected. Shutting down ...........`);
  process.exit(1)
})