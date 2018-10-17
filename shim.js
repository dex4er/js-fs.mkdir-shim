'use strict';

const getPolyfill = require('./polyfill');

const define = require('define-properties');

const fs = require('fs');

module.exports = function shimFsMkdir () {
  const polyfill = getPolyfill();
  if (polyfill !== fs) {
    polyfill.orig = fs.mkdir;
    define(fs, { mkdir: polyfill }, {
      mkdir: function testmkdir () {
        return fs.mkdir !== polyfill;
      }
    });
  }
  return polyfill;
};
