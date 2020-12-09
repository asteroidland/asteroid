import { serve, Server } from "https://deno.land/std@0.80.0/http/server.ts";
import { Reflect } from "../lib/Reflect.ts";
import { HANDLER_METADATA } from "./constants.ts";
import { RouteOption } from "./decorator/route.ts";
import { ControllerMetadata, MethodOptions } from "./types.ts";
import { ReflectUtils } from "./utils/reflect.utils.ts";

export interface AsteroidApplicationOptions {
  port: number;
  hostname?: string;
}

export class AsteroidApplication {

  private server: Server | undefined;
  // private routes: Map<RouteOption, Function | undefined> = new Map();
  private routes: Map<string, MethodOptions | undefined> = new Map<string, MethodOptions | undefined>()

  constructor() {}

  async listen(options: AsteroidApplicationOptions) {
    this.server = serve({ hostname: options.hostname, port: options.port });

    let host = ''
    if (options.hostname) {
      host = `http://${options.hostname}:${options.port}/`;
    } else {
      host = `http://localhost:${options.port}/`;
    }
    console.log(`☄️  ☄️  Meteor running ☄️  ☄️. \nAccess it at: ${host}\n\n`);

    for await (const request of this.server) {

      // const routeOption: RouteOption = {
      //   url: request.url,
      //   method: request.method
      // }

      // if (this.routes.has(routeOption)) {
      //   let bodyContent = "Your user-agent is:\n\n";
      //   bodyContent += request.headers.get("user-agent") || "Unknown";
      //   bodyContent += '\n' + request.url + '\n' + request.method
      //   request.respond({ status: 200, body: bodyContent });
      // } else {
      //   request.respond({ status: 404, body: 'Not Found' });
      // }

      const isRequestValid: Boolean = this.routes.has(request.url) && request.method === this.routes.get(request.url)?.method;

      if (isRequestValid) {
        let bodyContent = "Your user-agent is:\n\n";
        bodyContent += request.headers.get("user-agent") || "Unknown";
        bodyContent += '\n' + request.url + '\n' + request.method

        this.routes.get(request.url)?.fn();
        
        request.respond({ status: 200, body: bodyContent });
      } else {
        request.respond({ status: 404, body: 'Not Found' });
      }
    }
  }

  addController(controller: any): void {
    const metadata: ControllerMetadata | undefined = ReflectUtils.getControllerMetadata(controller);
    if (metadata !== undefined) {
      for (let key of metadata.routes.keys()) {
        this.routes.set(key, metadata.routes.get(key));
        console.log(`☄️  Added endpoint ${key} with method ${ metadata.routes.get(key)?.method}`);
      }
    }
  }

  // addHandler(handler: any) {
  //   if (Reflect.hasMetadata(HANDLER_METADATA, handler)) {
  //     const metadata = Reflect.getMetadata(HANDLER_METADATA, handler)
  //     for (let key of metadata.routes.keys()) {
  //       this.routes.set(key, metadata.routes.get(key))
  //       console.log(`☄️  Added endpoint ${key.url} with method ${key.method}`);
  //     }
  //   }
  // }
}