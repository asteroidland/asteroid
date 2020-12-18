import { Reflect } from "../../lib/Reflect.ts";
import { CONTROLLER_METADATA, MODULE_METADATA } from "../constants.ts";
import { ControllerMetadata, MethodOptions, ModuleMetadata } from "../types.ts";

export class ReflectUtils {

  static setOwnModuleMetadata(value: ModuleMetadata, target: Function): void {
    Reflect.defineMetadata(MODULE_METADATA, value, target);
  }

  static getOwnModuleMetadata(target: Function): ModuleMetadata | undefined {
    return Reflect.getOwnMetadata(MODULE_METADATA, target);
  }

  static getDefaultModuleMetadata(): ModuleMetadata {
    const metadata: ModuleMetadata = {
      controllers: []
    }
    return metadata
  }

  static setControllerMetadata(value: ControllerMetadata, target: Object): void {
    Reflect.defineMetadata(CONTROLLER_METADATA, value, target.constructor);
  }

  static setOwnControllerMetadata(value: ControllerMetadata, target: Function): void {
    Reflect.defineMetadata(CONTROLLER_METADATA, value, target);
  }

  static getControllerMetadata(target: Object): ControllerMetadata | undefined {
    return Reflect.getMetadata(CONTROLLER_METADATA, target.constructor);
  }

  static getOwnControllerMetadata(target: Function): ControllerMetadata | undefined {
    return Reflect.getOwnMetadata(CONTROLLER_METADATA, target);
  }

  static getDefaultControllerMetadata(): ControllerMetadata {
    const metadata: ControllerMetadata = {
        prefix: '/',
        routes: new Map<MethodOptions, Function>()
    }
    return metadata
  }
}