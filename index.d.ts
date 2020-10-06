/// <reference types="node" />

/* eslint-disable no-shadow */

import {PathLike, Mode, MakeDirectoryOptions, NoParamCallback} from 'fs';

/**
 * Asynchronous mkdir(2) - create a directory.
 *
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
 * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
 */
declare function mkdir(
  path: PathLike,
  options: Mode | (MakeDirectoryOptions & {recursive?: false}) | null | undefined,
  callback: NoParamCallback
): void;

/**
 * Asynchronous mkdir(2) - create a directory.
 *
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
 * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
 */
declare function mkdir(
  path: PathLike,
  options: Mode | MakeDirectoryOptions | null | undefined,
  callback: (err: NodeJS.ErrnoException | null, path: string | undefined) => void
): void;

/**
 * Asynchronous mkdir(2) - create a directory with a mode of `0o777`.
 *
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
declare function mkdir(path: PathLike, callback: NoParamCallback): void;

// NOTE: This namespace provides design-time support for util.promisify. Exported members do not exist at runtime.
declare namespace mkdir {
  /**
   * Asynchronous mkdir(2) - create a directory.
   *
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
   * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
   */
  function __promisify__(path: PathLike, options: MakeDirectoryOptions & {recursive: true}): Promise<string>;

  /**
   * Asynchronous mkdir(2) - create a directory.
   *
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
   * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
   */
  function __promisify__(
    path: PathLike,
    options?: Mode | (MakeDirectoryOptions & {recursive?: false}) | null
  ): Promise<void>;

  /**
   * Asynchronous mkdir(2) - create a directory.
   *
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
   * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
   */
  function __promisify__(path: PathLike, options?: Mode | MakeDirectoryOptions | null): Promise<string | undefined>;
}

export = mkdir;
