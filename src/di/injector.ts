import { Type } from '../types.ts';
import { Reflect } from '../../lib/Reflect.ts';
import { DESIGN_PARAMTYPES } from '../constants.ts';

export class Injector {

  private depInstances: Map<string, Type<any>> = new Map<string, Type<any>>()

  resolve<T>(target: Type<any>): any {
    const instance = this.depInstances.get(target.name);
    if (instance) {
      return instance;
    }

    const tokens = Reflect.getMetadata(DESIGN_PARAMTYPES, target) || [];
    const injections = tokens.map((token: Type<T>) => this.resolve<Type<T>>(token));
    const newInstance = new target(...injections);

    this.depInstances.set(target.name, newInstance);

    return newInstance;
  }

  release() {
    this.depInstances.clear()
  }
}