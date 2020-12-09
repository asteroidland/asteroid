import { HTTPMethod } from "../types.ts";

export class ParseUtils {
    static toHttpMethod(method: string): HTTPMethod {
        if (method.toUpperCase() === HTTPMethod.GET) {
            return HTTPMethod.GET;
        }
        if (method.toUpperCase() === HTTPMethod.POST) {
            return HTTPMethod.POST;
        }
        if (method.toUpperCase() === HTTPMethod.PUT) {
            return HTTPMethod.PUT;
        }
        if (method.toUpperCase() === HTTPMethod.PATCH) {
            return HTTPMethod.PATCH;
        }
        return HTTPMethod.DELETE;
    }
}