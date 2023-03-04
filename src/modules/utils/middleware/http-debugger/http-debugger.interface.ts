import type { Response } from 'express';
import type { RotatingFileStream } from 'rotating-file-stream';

export interface IHttpDebuggerConfigOptions {
  readonly stream: RotatingFileStream;
}

export interface IHttpDebuggerConfig {
  readonly debuggerHttpFormat: string;
  readonly HttpDebuggerOptions: IHttpDebuggerConfigOptions;
}

export interface ICustomResponse extends Response {
  body: string;
}
