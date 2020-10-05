/// <reference types="node" />

import * as fs from 'fs';

/**
 * Asynchronous mkdir(2) - create a directory.
 *
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
 */
declare function mkdir(
  path: fs.PathLike,
  mode: number | string | fs.MakeDirectoryOptions | undefined | null,
  callback: (err: NodeJS.ErrnoException | null) => void
): void;

/**
 * Asynchronous mkdir(2) - create a directory with a mode of `0o777`.
 *
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
declare function mkdir(path: fs.PathLike, callback: (err: NodeJS.ErrnoException | null) => void): void;

// NOTE: This namespace provides design-time support for util.promisify. Exported members do not exist at runtime.
declare namespace mkdir {
  /**
   * Asynchronous mkdir(2) - create a directory.
   *
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
   */
  function __promisify__(path: fs.PathLike, mode?: number | string | fs.MakeDirectoryOptions | null): Promise<void>;
}

export = mkdir;
