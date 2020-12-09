import { serve, Server, ServerRequest } from "https://deno.land/std@0.80.0/http/server.ts";
import { ControllerMetadata, MethodOptions } from "./types.ts";
import { ParseUtils } from "./utils/parse.utils.ts";
import { ReflectUtils } from "./utils/reflect.utils.ts";

export interface AsteroidApplicationOptions {
  port: number;
  hostname?: string;
}

export class AsteroidApplication {

  private server: AsyncIterable<ServerRequest> | undefined;
  private routes: Map<string, Function | undefined> = new Map<string, Function | undefined>()
  private options: AsteroidApplicationOptions = { port: 8080 };

  constructor(options: AsteroidApplicationOptions = { port: 8080 }) {
    this.options = options
  }

  async listen() {
    this.server = this.newServer();
    this.printServerRunning();

    for await (const request of this.server) {

      const options: MethodOptions = {
        path: request.url,
        method: ParseUtils.toHttpMethod(request.method)
      }

      if (this.routes.has(JSON.stringify(options))) {
        const fn = this.routes.get(JSON.stringify(options))
        if (fn !== undefined) {
          fn();
        }
        request.respond({ status: 200, body: 'works' });
      } else {
        request.respond({ status: 404, body: 'Not Found' });
      }
    }
  }

  close() {
    (this.server as Server).close()
  }

  addController(controller: any): void {
    const metadata: ControllerMetadata | undefined = ReflectUtils.getControllerMetadata(controller);
    if (metadata !== undefined) {
      if (metadata.routes.size <= 0) {
        throw new Error('Controller without routes');
      }
      for (let key of metadata.routes.keys()) {
        const endpoint: string = key.path !== '' ? `${metadata.prefix}/${key.path}` : `${metadata.prefix}`;
        const options: MethodOptions = {
          path: endpoint,
          method: key.method
        }
        this.routes.set(JSON.stringify(options), metadata.routes.get(key));
      }
    }
  }

  private newServer(): AsyncIterable<ServerRequest> {
    return serve({ hostname: this.options.hostname, port: this.options.port });
  }

  private printServerRunning() {
    let host = this.options?.hostname ? `http://${this.options.hostname}:${this.options.port}/` : `http://localhost:${this.options.port}/`;
    console.log(`☄️  ☄️  Asteroid running. Access it at: ${host} ☄️  ☄️\n`);
    for (let key of this.routes.keys()) {
      console.log(`☄️  Added endpoint ${JSON.parse(key).path} with method ${JSON.parse(key).method}`);
    }
  }
}