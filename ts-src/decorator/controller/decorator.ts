import { AsteroidReflect } from '../reclect.ts';

export function Controller(): ClassDecorator {
  return (target: Function): void => {
    AsteroidReflect.setOwnControllerMetadata(target);
  }
}