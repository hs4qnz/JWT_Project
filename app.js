const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');

const logger = require('./common/logger');
const errorHandler = require('./core/error-handler');

/**
 * An express web application instance.
 */
const app = express();
app.disable('x-powered-by');

/**
 * Allow all CORS requests for development.
 */
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

/**
 * Connect to the mongodb server using mongoose.
 */
const database = require('./database');

/**
 * Find the config document from mongo & create redit var.
 * TODO: Convert this code block to middleware.
 */
//const Config = database.model('Config');

/*
// Find first config from collection "configs".
Config.findOne({}, (err, doc) => {
  if (err && err !== undefined) {
    logger.error('[startup] couldn\'t findOne config doc from mongodb.');
    logger.error(`[startup] ${err}`);
    return;
  }

  // Not found the config document.
  if (!doc || doc === undefined) {
    logger.warn('[startup] not found config document in mongodb.');
    return;
  }

  // Send the config to redis server.
  const json = JSON.stringify(doc.toJSON());
  redisClient.setSharedConfig(json)
    .then((reply) => {
      logger.info('[redis] sent config to redis server on startup.');
    })
    .catch((redisErr) => {
      logger.error('[redis] couldn\'t sed config to redis server.');
      logger.error(`[redis] ${redisErr}`);
    });
});
*/

/**
 * Print morgan concise logs each http requests.
 * WARN: Don't forget implement pm2-logrotate.
 */
app.use(morgan('dev'));

/**
 * Compress respone bodies each http requests.
 * that traverse through the middleware on production.
 */
if (process.env.NODE_ENV === 'production') {
  app.use(compression());
}

/**
 * Parse incoming http requests with JSON payloads.
 * application/json
 */
app.use(express.json({ limit: '100kb' }));

/**
 * Parse incoming requests with form urlencoded payloads.
 * application/x-www-form-urlencoded
 */
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

/**
 * Adds more express router here.
 */
app.use(require('./routes/user-router'));


/**
 * Didn't match any server-side routers.
 */
app.get('/*', (req, res, next) => {
    // Send 404 page not found without error.
    res.status(404).json({
      status: 'error',
      statusCode: 404,
      message: 'The resource could not be found.',
    });
  });
  
  /**
   * Setup centralized error handling.
   */
  app.use(errorHandler);
  
  /**
   * The configured express instance.
   */
  module.exports = app;
  
