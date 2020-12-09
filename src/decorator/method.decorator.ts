import { ControllerMetadata, HTTPMethod, MethodOptions } from "../types.ts";
import { ReflectUtils } from "../utils/reflect.utils.ts";

// TODO: Criar um map de <(path, method), function>
export function Get(path?: string): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void => {
        const metadata: ControllerMetadata = ReflectUtils.getControllerMetadata(target) ?? ReflectUtils.getDefaultControllerMetadata();

        // const endpoint: string = path !== undefined ? `${metadata.prefix}/${path}` : `${metadata.prefix}`;
        const endpoint: string = path !== undefined ? path : ''
        const options: MethodOptions = {
            method: HTTPMethod.GET,
            fn: descriptor.value
        };

        metadata.routes.set(endpoint, options);
        ReflectUtils.setControllerMetadata(metadata, target);
    }
}