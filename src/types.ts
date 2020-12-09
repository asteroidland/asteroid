export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export interface MethodOptions {
    method: HTTPMethod,
    fn: Function
}

export interface ControllerMetadata {
    prefix: string
    routes: Map<string, MethodOptions>
}