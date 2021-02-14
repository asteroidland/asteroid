import { AsteroidReflect } from "../reclect.ts";

export interface ControllerMetadata {
  isController: boolean
}

/**
 * 
 * instanceOfControllerMetadata Check if a object is Controller
 * 
 * @param object - An Function or Object that will be checked if is instance of ControllerMetadata
 * 
 * @internal
 */
export function instanceOfControllerMetadata(object: any ): object is ControllerMetadata {
  const metadata = AsteroidReflect.getOwnControllerMetadata(object);
  if (metadata !== undefined) {
    return metadata.isController
  }
  return false;
}