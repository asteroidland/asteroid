import { ControllerMetadata, HTTPMethod, MethodOptions } from "../types.ts";
import { ReflectUtils } from "../utils/reflect.utils.ts";

export function Get(path?: string): MethodDecorator {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void => {
        const metadata: ControllerMetadata = ReflectUtils.getControllerMetadata(target) ?? ReflectUtils.getDefaultControllerMetadata();

        const endpoint: string = path !== undefined ? path : ''
        const options: MethodOptions = {
            path: endpoint,
            method: HTTPMethod.GET
        };

        metadata.routes.set(options, descriptor.value);
        ReflectUtils.setControllerMetadata(metadata, target);
    }
}