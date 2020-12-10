import { ControllerMetadata, HTTPMethod, MethodOptions } from "../types.ts";
import { ReflectUtils } from "../utils/reflect.utils.ts";

function createMethodOptions(path: string | undefined, method: HTTPMethod): MethodOptions {
    const endpoint: string = path !== undefined ? path : ''
    const options: MethodOptions = {
        path: endpoint,
        method: method
    };
    return options
}

export function Get(path?: string): MethodDecorator {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void => {
        const metadata: ControllerMetadata = ReflectUtils.getControllerMetadata(target) ?? ReflectUtils.getDefaultControllerMetadata();

        const options: MethodOptions = createMethodOptions(path, HTTPMethod.GET)

        metadata.routes.set(options, descriptor.value);
        ReflectUtils.setControllerMetadata(metadata, target);
    }
}

export function Post(path?: string): MethodDecorator {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void => {
        const metadata: ControllerMetadata = ReflectUtils.getControllerMetadata(target) ?? ReflectUtils.getDefaultControllerMetadata();

        const options: MethodOptions = createMethodOptions(path, HTTPMethod.POST)

        metadata.routes.set(options, descriptor.value);
        ReflectUtils.setControllerMetadata(metadata, target);
    }
}

export function Put(path?: string): MethodDecorator {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void => {
        const metadata: ControllerMetadata = ReflectUtils.getControllerMetadata(target) ?? ReflectUtils.getDefaultControllerMetadata();

        const options: MethodOptions = createMethodOptions(path, HTTPMethod.PUT)

        metadata.routes.set(options, descriptor.value);
        ReflectUtils.setControllerMetadata(metadata, target);
    }
}

export function Delete(path?: string): MethodDecorator {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void => {
        const metadata: ControllerMetadata = ReflectUtils.getControllerMetadata(target) ?? ReflectUtils.getDefaultControllerMetadata();

        const options: MethodOptions = createMethodOptions(path, HTTPMethod.DELETE)

        metadata.routes.set(options, descriptor.value);
        ReflectUtils.setControllerMetadata(metadata, target);
    }
}

export function Patch(path?: string): MethodDecorator {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void => {
        const metadata: ControllerMetadata = ReflectUtils.getControllerMetadata(target) ?? ReflectUtils.getDefaultControllerMetadata();

        const options: MethodOptions = createMethodOptions(path, HTTPMethod.PATCH)

        metadata.routes.set(options, descriptor.value);
        ReflectUtils.setControllerMetadata(metadata, target);
    }
}