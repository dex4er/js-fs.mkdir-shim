/// <reference types="node" />

import * as fs from 'fs';

declare function getPolyfill():
  | ((
      path: fs.PathLike,
      mode: number | string | fs.MakeDirectoryOptions | undefined | null,
      callback: (err: NodeJS.ErrnoException) => void
    ) => void)
  | ((path: fs.PathLike, callback: (err: NodeJS.ErrnoException) => void) => void);

export = getPolyfill;
