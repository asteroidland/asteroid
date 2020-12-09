import { Reflect } from "../../lib/Reflect.ts";
import { HANDLER_METADATA } from "../constants.ts";
import { RouteOption } from "./route.ts";

export interface HandlerOption {
  url: string
  routes: Map<RouteOption, Function>
}

export function Handler(url?: string) {
  return <T extends new (...args: any[]) => any>(target: T) => {
    return class extends target {
      constructor(...args: any[]) {
        const handlerOption: HandlerOption = {
          url: url !== undefined ? '/' + url : '/',
          routes: new Map()
        }
        Reflect.defineMetadata(HANDLER_METADATA, handlerOption, target);
        console.log(Reflect.getMetadata(HANDLER_METADATA, target));
        console.log(target);
        super(...args);
      }
    }
  }
}