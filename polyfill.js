'use strict';

const implementation = require('./implementation');

const fs = require('fs');
const semver = require('semver');

module.exports = function getPolyfill () {
  if (semver.gte(process.version, '10.12.0')) {
    return fs.mkdir;
  }
  return implementation;
};
