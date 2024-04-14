const colors = require('colors');

/**
 * Print whatever your pass on terminal with yello color.
 *
 * @param {*} data - Any data that want to print out.
 */
const warn = (data) => {
  console.warn(colors.yellow(data));
};

/**
 * Print whatever your pass on terminal with green color.
 *
 * @param {*} data - Any data that want to print out.
 */
const info = (data) => {
  console.info(colors.green(data));
};

/**
 * Print whatever your pass on terminal with blue color.
 *
 * @param {*} data - Any data that want to print out.
 */
const debug = (data) => {
  console.debug(colors.blue(data));
};

/**
 * Print whatever your pass on terminal with red background.
 *
 * @param {*} data - Any data that want to print out.
 */
const error = (data) => {
  console.error(colors.red(data));
};

/**
 * Print whatever your pass on terminal as JSON format.
 *
 * @param {*} data - Any data that want to print out.
 */
const json = (data) => {
  console.info(colors.magenta(JSON.stringify(data, null, 2)));
};

module.exports = {
  debug,
  error,
  info,
  warn,
  json,
};
