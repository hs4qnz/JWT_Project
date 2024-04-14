/**
 * The small utility functions that can copy to other project at any time.
 * NOTE: Please avoid adding function that work for only this project.
 */
//const uuid = require('uuid');
//const numeral = require('numeral');
const logger = require('./logger');

/**
 * Verify json format from json string.
 *
 * @param {string} jsonString - A json in string.
 * @return {boolean} Verify result as boolean.
 */
exports.isJson = (jsonString) => {
  try {
    JSON.parse(jsonString);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Format long number to shorter numbers such 400k, 1m.
 * @param {number} number - The nubmer as integert.
 * @return {string} Formatted shorter numbers.
 */
//exports.shortNumber = (number) => numeral(number).format('0.0a');

/**
 * Decode encoded base64 string to plain text.
 *
 * @param {string} base64Text - Encoded base64 string.
 * @return {string} Decoded plain text in string.
 */
exports.decodeBase64 = (base64Text) => Buffer.from(base64Text, 'base64').toString();

/**
 * Decode encoded base64 string to plain text.
 *
 * @param {string} base64Text - Encoded base64 string.
 * @return {string} Decoded plain text in string.
 */
exports.decodeBase64 = (base64Text) => Buffer.from(base64Text, 'base64').toString();

/**
 * Encode plain text string to base64.
 *
 * @param {string} plainText - Plain text in string.
 * @return {string} Encoded base64 in string.
 */
exports.encodeBase64 = (plainText) => Buffer.from(plainText).toString('base64');

/**
 * Convert amount of month to milliseconds.
 *
 * @param {number} month - Amount of month as number.
 * @return {number} Milliseconds as number.
 */
exports.convertMonthToMillisecond = (month) => 1000 * 60 * 60 * 24 * 30 * month;

/**
 * Convert amount of day to milliseconds.
 *
 * @param {number} day - Amount of day as number.
 * @return {number} Milliseconds as number.
 */
exports.convertDayToMillisecond = (day) => 1000 * 60 * 60 * 24 * day;

/**
 * Convert amount of hour to minutes.
 *
 * @param {number} hour - Amount of hour as number.
 * @return {number} Minutes as number.
 */
exports.convertHourToMinute = (hour) => 60 * hour;

/**
 * Random integer in your expected range.
 *
 * @param {number} min - Minimum value that you expected.
 * @param {number} max - Maximum value that you expected.
 * @return {number} Randomed integer as a number.
 */
exports.randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Random lorem ipsum image url.
 *
 * @param {number} width - Image width as number.
 * @param {number} height - Image height as number.
 * @return {string} Randomed lorem image in string.
 */
exports.randomImageUrl = (width, height) => `https://picsum.photos/id/${this.randomInt(1, 100)}/${width}/${height}`;

/**
 * Gets the client ip address for each request.
 * NOTE: May compat with expressJS only.
 *
 * @param {object} req - The req object that represents the HTTP request.
 * @return {string} The client ip address in string.
 */
exports.getIpAddress = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

/**
 * Generate new unique filename using uuid.
 *
 * @param {string} extname - Original file extension in string.
 * @return {string } New unique filename in string.
 */
//exports.getUniqueFilename = (extname) => uuid.v4() + extname;

/**
 * Determine whether a object is empty property.
 *
 * @param {object} req - The req object that represents the HTTP request.
 * @return {boolean} Verify result as boolean.
 */
exports.isEmptyObject = (obj) => !Object.keys(obj).length;

/**
 * Padding interger number to prefix number (001).
 *
 * @param {number} number - The actual integer number.
 * @param {number} width - Padding size as number.
 * @return {string} Padded number in string
 */
exports.padNumber = (number, width, dashLetter) => {
  dashLetter = dashLetter || '0';
  number += '';
  if (number.length >= width) return number;
  return new Array(width - number.length + 1).join(dashLetter) + number;
};

/**
 * Random one object property value.
 *
 * @param {object} - A javascript object.
 * @returns {*} Any value from property.
 */
exports.randomProperty = function (obj) {
  const keys = Object.keys(obj);
  // eslint-disable-next-line no-bitwise
  return obj[keys[keys.length * Math.random() << 0]];
};
