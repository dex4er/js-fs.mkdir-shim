'use strict';

// taken from https://github.com/nodejs/node/blob/master/test/parallel/test-fs-mkdir.js

const mkdir = require('..');

const common = require('./common');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const tmpdir = require('./tmpdir');
tmpdir.refresh();

let dirc = 0;
function nextdir() {
  return `test${++dirc}`;
}

// mkdir creates directory using assigned path
{
  const pathname = path.join(tmpdir.path, nextdir());

  mkdir(
    pathname,
    common.mustCall(err => {
      assert.equal(err, null);
      assert.equal(fs.existsSync(pathname), true);
    })
  );
}

// mkdir creates directory with assigned mode value
{
  const pathname = path.join(tmpdir.path, nextdir());

  mkdir(
    pathname,
    0o777,
    common.mustCall(err => {
      assert.equal(err, null);
      assert.equal(fs.existsSync(pathname), true);
    })
  );
}

// mkdirp when folder does not yet exist.
{
  const pathname = path.join(tmpdir.path, nextdir(), nextdir());

  mkdir(
    pathname,
    {recursive: true},
    common.mustCall(err => {
      assert.equal(err, null);
      assert.equal(fs.existsSync(pathname), true);
      assert.equal(fs.statSync(pathname).isDirectory(), true);
    })
  );
}

// mkdirp when path is a file.
{
  const pathname = path.join(tmpdir.path, nextdir(), nextdir());

  mkdir(path.dirname(pathname), err => {
    assert.equal(err, null);
    fs.writeFileSync(pathname, '', 'utf8');
    mkdir(
      pathname,
      {recursive: true},
      common.mustCall(err2 => {
        assert.equal(err2.code, 'EEXIST');
        assert.equal(err2.syscall, 'mkdir');
        assert.equal(fs.statSync(pathname).isDirectory(), false);
      })
    );
  });
}

// mkdirSync and mkdir require options.recursive to be a boolean.
// Anything else generates an error.
{
  const pathname = path.join(tmpdir.path, nextdir());
  ['', 1, {}, [], null, Symbol('test'), () => {}].forEach(recursive => {
    common.expectsError(() => mkdir(pathname, {recursive}, common.mustNotCall()), {
      code: 'ERR_INVALID_ARG_TYPE',
      type: TypeError
    });
  });
}

// Keep the event loop alive so the async mkdir() requests
// have a chance to run (since they don't ref the event loop).
process.nextTick(() => {});
