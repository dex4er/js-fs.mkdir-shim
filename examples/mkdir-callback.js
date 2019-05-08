// const mkdir = require('fs.mkdir-shim');
const mkdir = require('..');

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
mkdir('/tmp/a/apple', {recursive: true}, err => {
  if (err) throw err;
  else console.info('Directory created');
});
