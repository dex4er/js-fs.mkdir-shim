// const mkdir = require('fs.mkdir-shim');
const mkdir = require('..');

const promisify = require('util.promisify');
const mkdirPromise = promisify(mkdir);

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
mkdirPromise('/tmp/a/apple', {recursive: true})
  .then(() => console.info('Directory created'))
  .catch(console.error);
