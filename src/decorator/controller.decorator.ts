import { ControllerMetadata } from "../types.ts"
import { ReflectUtils } from "../utils/reflect.utils.ts"

export function Controller(path?: string): ClassDecorator {
    return (target: Function): void => {
        const metadata: ControllerMetadata = ReflectUtils.getOwnControllerMetadata(target) ?? ReflectUtils.getDefaultControllerMetadata();

        const prefix = path !== undefined ? '/' + path : '/';
        metadata.prefix = prefix;

        ReflectUtils.setOwnControllerMetadata(metadata, target);
    }
}