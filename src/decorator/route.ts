import { Reflect } from "../../lib/Reflect.ts";
import { HANDLER_METADATA } from "../constants.ts";

export interface RouteOption {
  url: string,
  method: string,
}

// export function Get(url?: string) {
//   return function(target: any, property: string, descriptor: PropertyDescriptor) {
//     console.log(target)
//     console.log(property)
//     console.log(descriptor)
//     console.log(Reflect.getOwnMetadata(HANDLER_METADATA, target))
//     if (Reflect.hasMetadata(HANDLER_METADATA, target)) {
//       console.log('works');
//       const metadata = Reflect.getMetadata(HANDLER_METADATA, target)
//       const endpoint = url !== undefined ? `${metadata.url}/${url}` : `${metadata.url}`;
//       const options: RouteOption = {
//         url: endpoint,
//         method: 'GET'
//       }
  
//       metadata.routes.set(options, () => {});
//     }
//   }
// }