import { AsteroidReflect } from "../reclect.ts";
import { InjectableMetadata, instanceOfInjectableMetadata } from "./metadata.ts";

export function Injectable(): (target: InjectableMetadata<any>) => void  {
  return (target: InjectableMetadata<any>) => {
    AsteroidReflect.setOwnInjectableMetadata(target);
  }
}