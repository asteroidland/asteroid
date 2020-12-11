import { Type } from '../types.ts';
import { Reflect } from '../../lib/Reflect.ts';
import { DESIGN_PARAMTYPES } from '../constants.ts';

export class Injector extends Map {

  resolve<T>(target: Type<any>) {
    const instance = this.get(target);
    if (instance) {
      return instance;
    }

    const tokens = Reflect.getMetadata(DESIGN_PARAMTYPES, target) || [];
    const injections = tokens.map((token: Type<any>) => this.resolve(token));
    const newInstance = new target(...injections);

    this.set(target, newInstance);

    return newInstance;
  }

  dissolve() {
    this.clear()
  }
}