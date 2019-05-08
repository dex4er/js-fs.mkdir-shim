'use strict';

const fs = require('fs');
const makeDir = require('make-dir');

const mkdirOrig = fs.mkdir && typeof fs.mkdir.orig === 'function' ? fs.mkdir.orig : fs.mkdir;

function mkdir(path, options, callback) {
  let mode = 0o777;
  let recursive = false;

  if (typeof options === 'function') {
    callback = options;
  } else if (typeof options === 'number') {
    mode = options;
  } else if (typeof options === 'object') {
    mode = options.mode || mode;
    recursive = options.recursive;
  }
  if (typeof recursive !== 'boolean') {
    const err = new Error(`The "recursive" argument must be of type boolean. Received type ${typeof recursive}`);
    err.code = 'ERR_INVALID_ARG_TYPE';
    err.name = 'Error [ERR_INVALID_ARG_TYPE]';
    err.type = TypeError;
    throw err;
  }
  if (recursive) {
    makeDir(path, {mode: mode})
      .then(() => callback())
      .catch(err => callback(err));
  } else {
    mkdirOrig(path, mode, callback);
  }
}

mkdir.orig = mkdirOrig;

module.exports = mkdir;
