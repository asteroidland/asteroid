import { serve, Server } from "https://deno.land/std@0.80.0/http/server.ts";
import { ControllerMetadata, MethodOptions } from "./types.ts";
import { ParseUtils } from "./utils/parse.utils.ts";
import { ReflectUtils } from "./utils/reflect.utils.ts";

export interface AsteroidApplicationOptions {
  port: number;
  hostname?: string;
}

export class AsteroidApplication {

  private server: Server | undefined;
  private routes: Map<string, Function | undefined> = new Map<string, Function | undefined>()

  constructor() {}

  async listen(options: AsteroidApplicationOptions) {
    this.server = serve({ hostname: options.hostname, port: options.port });
    this.printServerRunning(options);

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

  addController(controller: any): void {
    const metadata: ControllerMetadata | undefined = ReflectUtils.getControllerMetadata(controller);
    if (metadata !== undefined) {
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

  private printServerRunning(options: AsteroidApplicationOptions) {
    let host = options.hostname ? `http://${options.hostname}:${options.port}/` : `http://localhost:${options.port}/`;
    console.log(`☄️  ☄️  Asteroid running. Access it at: ${host} ☄️  ☄️\n`);
    for (let key of this.routes.keys()) {
      console.log(`☄️  Added endpoint ${JSON.parse(key).path} with method ${JSON.parse(key).method}`);
    }
  }
}