import * as util from 'util';

// import mkdir = require('fs.mkdir-shim');
import mkdir = require('..');

// Have to wait for https://github.com/DefinitelyTyped/DefinitelyTyped/pull/35270
// tslint:disable-next-line:no-var-requires
const promisify = require('util.promisify') as typeof util.promisify;
const mkdirPromise = promisify(mkdir);

async function run(): Promise<void> {
  // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
  await mkdirPromise('/tmp/a/apple', {recursive: true});
  console.info('Directory created');
}

run().catch(console.error);
