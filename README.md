# fs.mkdir-shim

<!-- markdownlint-disable MD013 -->
[![Build Status](https://secure.travis-ci.org/dex4er/js-fs.mkdir-shim.svg)](http://travis-ci.org/dex4er/js-fs.mkdir-shim) [![npm](https://img.shields.io/npm/v/fs.mkdir-shim.svg)](https://www.npmjs.com/package/fs.mkdir-shim)
<!-- markdownlint-enable MD013 -->

Polyfill for fs.mkdir in node versions &lt; v10.12

node v10.12.0 added support for a recursive option for `fs.mkdir`:
<https://github.com/nodejs/node/pull/21875>

This package provides the built-in `fs.mkdir` in node v10.12.0 and later,
and a replacement in other environments.

This module requires Node >= 4.

This package implements the [es-shim API](https://github.com/es-shims/api)
interface. It works in an ES6-supported environment and complies with the
[spec](http://www.ecma-international.org/ecma-262/6.0/).

## Usage

### Direct

```js
const mkdir = require('fs.mkdir-shim');
// Use `mkdir` just like the built-in method on `fs`
```

_Typescript:_

```ts
import mkdir from 'fs.mkdir-shim';
// Use `mkdir` just like the built-in method on `fs`
```

### Shim

```js
require('fs.mkdir-shim/shim')();
// `fs.mkdir` is now defined
const fs = require('fs');
// Use `fs.mkdir`
```

or:

```js
require('fs.mkdir-shim/auto');
// `fs.mkdir` is now defined
const fs = require('fs');
// Use `fs.mkdir`
```

_Typescript:_

```js
import mkdirShim from 'fs.mkdir-shim/shim';
mkdirShim();
// `fs.mkdir` is now defined
import fs from 'fs';
// Use `fs.mkdir`
```

or:

```js
import 'fs.mkdir-shim/auto';
// `fs.mkdir` is now defined
import fs from 'fs';
// Use `fs.mkdir`
```
