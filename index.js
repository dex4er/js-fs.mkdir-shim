'use strict';

const implementation = require('./implementation');
const getPolyfill = require('./polyfill');
const polyfill = getPolyfill();
const shim = require('./shim');

const define = require('define-properties');
const fsModule = require('fs');

const boundMkdir = function mkdir () {
  return polyfill.apply(fsModule, arguments);
};
define(boundMkdir, {
  getPolyfill: getPolyfill,
  implementation: implementation,
  shim: shim
});

module.exports = boundMkdir;
