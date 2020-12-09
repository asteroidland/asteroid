export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export interface MethodOptions {
    path: string
    method: HTTPMethod,
}

export interface ControllerMetadata {
    prefix: string
    routes: Map<MethodOptions, Function>
}