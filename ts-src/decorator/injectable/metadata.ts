import { AsteroidReflect } from "../reclect.ts";

export interface InjectableMetadata<T> {
  new(...args: any[]): T
}

/**
 * 
 * instanceOfInjectableMetadata Check if a object has a constructor
 * 
 * @param object - An Function or Object that will be checked if is instance of InjectableMetadata
 * 
 * @internal
 */
export function instanceOfInjectableMetadata(object: any ): object is InjectableMetadata<any> {
  const metadata = AsteroidReflect.getOwnInjectableMetadata(object);
  if (metadata !== undefined) {
    return metadata.isInjectable
  }
  return false;
}