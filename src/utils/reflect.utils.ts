import { Reflect } from "../../lib/Reflect.ts";
import { CONTROLLER_METADATA } from "../constants.ts";
import { ControllerMetadata, MethodOptions } from "../types.ts";

export class ReflectUtils {
    static setControllerMetadata(value: ControllerMetadata, target: any): void {
        Reflect.defineMetadata(CONTROLLER_METADATA, value, target);
    }

    static getControllerMetadata(target: any): ControllerMetadata | undefined {
        return Reflect.getMetadata(CONTROLLER_METADATA, target);
    }

    static getOwnControllerMetadata(target: any): ControllerMetadata | undefined {
        return Reflect.getOwnMetadata(CONTROLLER_METADATA, target);
    }

    static getDefaultControllerMetadata(): ControllerMetadata {
        const metadata: ControllerMetadata = {
            prefix: '/',
            routes: new Map<string, MethodOptions>()
        }
        return metadata
    }
}