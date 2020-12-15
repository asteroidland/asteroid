import { Type } from '../types.ts';
import { Reflect } from '../../lib/Reflect.ts';
import { DESIGN_PARAMTYPES } from '../constants.ts';

export class Injector extends Map {

  resolve<T>(target: Type<any>): any {
    const instance = this.get(target);
    if (instance) {
      return instance;
    }

    const tokens = Reflect.getMetadata(DESIGN_PARAMTYPES, target) || [];
    const injections = tokens.map((token: Type<T>) => this.resolve<Type<T>>(token));
    const newInstance = new target(...injections);

    this.set(target, newInstance);

    return newInstance;
  }

  release() {
    this.clear()
  }
}