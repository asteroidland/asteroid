import { HTTPMethod, Type } from "../types.ts";
import { Injector } from "./injector.ts";

HTTPMethod.GET

export const bootstrap = <T>(target: Type<any>): [T, () => void] => {
    const injector = new Injector()
    const entryClass = injector.resolve<T>(target)

    return [entryClass, () => injector.dissolve()];
}