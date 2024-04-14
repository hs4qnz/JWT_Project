const mongoose = require('mongoose');
const uriBuilder = require('mongo-uri-builder');
const logger = require('../common/logger');

// Create mongodb URI connection on AWS.
const { MONGO_URI } = process.env;

//console.log("mongodb URI: ", MONGO_URI)

// Create mongodb URI connection string.
/*
const uri = uriBuilder({
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    replicas: [],
});
*/

// Create a database connection.
/*  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  });
  */

  // Use for connect to mongoDB on AWS
  mongoose.connect(MONGO_URI);
  
  // When successfully connected.
  mongoose.connection.on('connected', () => {
    logger.info(`[mongoose] connected to ${MONGO_URI}`);
  });
  
  // If the connection throws an error.
  mongoose.connection.on('error', (err) => {
    logger.warn(`[mongoose] using connection string: ${MONGO_URI}`);
    logger.error('[mongoose] unable to connect mongodb.');
    logger.error(err);
  });
  
  // When the connection is disconnected.
  mongoose.connection.on('disconnected', () => {
    logger.warn('[mongoose] disconnected from mongo.');
  });
  
  // If the Node process ends, close the Mongoose connection.
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.warn('[mongoose] disconnected through app termination.');
      process.exit(0);
    });
  });

// Adds more mongoose model here.
require('../models/user-model')(mongoose);

// The mongoose instance.
module.exports = mongoose;