import { Response, ServerRequest } from "https://deno.land/std@0.80.0/http/server.ts";

export class ServerMock implements AsyncIterable<ServerRequest> {

  request: ServerRequest = new ServerRequest()
  responseResult: Response | undefined;

  constructor() {}

  [Symbol.asyncIterator](): AsyncIterator<ServerRequest> {
    // mock request.respond
    this.request.respond = async (r: Response): Promise<void> => {
      this.responseResult = r
      return Promise.resolve();
    }

    const r = this.request
    let i: number = 0;

    return {
      next(): Promise<IteratorResult<ServerRequest>> {
        if (i === 0) {
          i++;
          return Promise.resolve({ value: r, done: false });
        } else {
          return Promise.resolve({ value: r, done: true });
        }
      }
    };
  }
}