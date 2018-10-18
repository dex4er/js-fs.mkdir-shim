'use strict';

const implementation = require('./implementation');

const fs = require('fs');

module.exports = function getPolyfill () {
  // heuristic: new mkdir validates `recursive` option
  try {
    fs.mkdir('.', { recursive: 0 }, () => { /* ignore */ });
  } catch (e) {
    if (e.code === 'ERR_INVALID_ARG_TYPE') {
      return fs.mkdir;
    }
  }
  return implementation;
};
