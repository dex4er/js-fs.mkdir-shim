'use strict';

// taken from https://github.com/nodejs/node/blob/master/test/common/index.js

const assert = require('assert');
const util = require('util');

function noop () {}

const mustCallChecks = [];

function isDeepEqual (actual, expected) {
  try {
    assert.deepEqual(actual, expected);
    return true;
  } catch (e) {
    return false;
  }
}

function runCallChecks (exitCode) {
  if (exitCode !== 0) return;

  const failed = mustCallChecks.filter(function (context) {
    if ('minimum' in context) {
      context.messageSegment = 'at least ' + context.minimum;
      return context.actual < context.minimum;
    } else {
      context.messageSegment = 'exactly ' + context.exact;
      return context.actual !== context.exact;
    }
  });

  failed.forEach(function (context) {
    console.log('Mismatched %s function calls. Expected %s, actual %d.',
      context.name,
      context.messageSegment,
      context.actual);
    console.log(context.stack.split('\n').slice(2).join('\n'));
  });

  if (failed.length) process.exit(1);
}

function _mustCallInner (fn, criteria, field) {
  criteria = criteria || 1;

  if (process._exiting) { throw new Error('Cannot use common.mustCall*() in process exit handler'); }
  if (typeof fn === 'number') {
    criteria = fn;
    fn = noop;
  } else if (fn === undefined) {
    fn = noop;
  }

  if (typeof criteria !== 'number') { throw new TypeError(`Invalid ${field} value: ${criteria}`); }

  const context = {
    [field]: criteria,
    actual: 0,
    stack: (new Error()).stack,
    name: fn.name || '<anonymous>'
  };

  // add the exit listener only once to avoid listener leak warnings
  if (mustCallChecks.length === 0) process.on('exit', runCallChecks);

  mustCallChecks.push(context);

  return function () {
    context.actual++;
    return fn.apply(this, arguments);
  };
}

class Comparison {
  constructor (obj, keys) {
    for (const key of keys) {
      if (key in obj) { this[key] = obj[key]; }
    }
  }
}

// Useful for testing expected internal/error objects
function expectsError (fn, settings, exact) {
  if (typeof fn !== 'function') {
    exact = settings;
    settings = fn;
    fn = undefined;
  }

  function innerFn (error) {
    if (arguments.length !== 1) {
      // Do not use `assert.strictEqual()` to prevent `util.inspect` from
      // always being called.
      assert.fail(`Expected one argument, got ${util.inspect(arguments)}`);
    }
    const descriptor = Object.getOwnPropertyDescriptor(error, 'message');
    // The error message should be non-enumerable
    assert.strictEqual(descriptor.enumerable, false);

    let innerSettings = settings;
    if ('type' in settings) {
      const type = settings.type;
      if (type !== Error && !Error.isPrototypeOf(type)) {
        throw new TypeError('`settings.type` must inherit from `Error`');
      }
      let constructor = error.constructor;
      if (constructor.name === 'NodeError' && type.name !== 'NodeError') {
        constructor = Object.getPrototypeOf(error.constructor);
      }
      // Add the `type` to the error to properly compare and visualize it.
      if (!('type' in error)) { error.type = constructor; }
    }

    if ('message' in settings &&
        typeof settings.message === 'object' &&
        settings.message.test(error.message)) {
      // Make a copy so we are able to modify the settings.
      innerSettings = Object.create(
        settings, Object.getOwnPropertyDescriptors(settings));
      // Visualize the message as identical in case of other errors.
      innerSettings.message = error.message;
    }

    // Check all error properties.
    const keys = Object.keys(settings);
    for (const key of keys) {
      if (!isDeepEqual(error[key], innerSettings[key])) {
        // Create placeholder objects to create a nice output.
        const a = new Comparison(error, keys);
        const b = new Comparison(innerSettings, keys);

        const tmpLimit = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        const err = new assert.AssertionError({
          actual: a,
          expected: b,
          operator: 'equal',
          stackStartFn: assert.throws
        });
        Error.stackTraceLimit = tmpLimit;

        throw new assert.AssertionError({
          actual: error,
          expected: settings,
          operator: 'common.expectsError',
          message: err.message
        });
      }
    }
    return true;
  }
  if (fn) {
    assert.throws(fn, innerFn);
    return;
  }
  return mustCall(innerFn, exact);
}

function mustCall (fn, exact) {
  return _mustCallInner(fn, exact, 'exact');
}

function getCallSite (top) {
  const originalStackFormatter = Error.prepareStackTrace;
  Error.prepareStackTrace = (_err, stack) =>
    `${stack[0].getFileName()}:${stack[0].getLineNumber()}`;
  const err = new Error();
  Error.captureStackTrace(err, top);
  // with the V8 Error API, the stack is not formatted until it is accessed
  err.stack; // eslint-disable-line no-unused-expressions
  Error.prepareStackTrace = originalStackFormatter;
  return err.stack;
}

function mustNotCall (msg) {
  const callSite = getCallSite(mustNotCall);
  return function mustNotCall () {
    assert.fail(
      `${msg || 'function should not have been called'} at ${callSite}`);
  };
}

module.exports = {
  expectsError: expectsError,
  getCallSite: getCallSite,
  mustCall: mustCall,
  mustNotCall: mustNotCall
};
