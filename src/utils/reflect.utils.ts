import { Reflect } from "../../lib/Reflect.ts";
import { CONTROLLER_METADATA } from "../constants.ts";
import { ControllerMetadata, MethodOptions } from "../types.ts";

export class ReflectUtils {
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