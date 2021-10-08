let host = window.location.origin + "/api";

function createUrl(path: string) {
    return host + path;
}

export type ApiError<E> = {
    errorKind: "DB",
    payload: { message: string }
} | {
    errorKind: String,
    payload: E
} | undefined;

export function isApiError<T, E>(response: ApiResponse<T, E>): response is ApiError<E> {
    return (response === undefined || (typeof response === "object" && "errorKind" in response));
}

export function isApiSuccess<T, E>(response: ApiResponse<T, E>): response is T {
    return !isApiError(response);
}

export type ApiResponse<T, E> = T | ApiError<E>;

class Api {
    get(path: string) {
        return new GetRequest(createUrl(path))
    }

    post(path: string) {
        return new PostRequest(createUrl(path));
    }

    put(path: string) {
        return new PutRequest(createUrl(path));
    }

    delete(path: string) {
        return new DeleteRequest(createUrl(path));
    }
}

export enum ContentType {
    JSON = "application/json",
    FormData = "multipart/form-data"
}

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'

abstract class ApiRequest {
    private path: string;
    private body: any | undefined;
    private headers: Record<string, string> = {};
    private params: any | undefined;

    protected abstract _method: Method;

    constructor(path: string) {
        this.path = path;
    }

    protected setHeader(name: string, value: string) {
        this.headers[name] = value;
        return this;
    }

    protected setBody(body: any) {
        this.body = body;
        return this;
    }

    public appendSegment(seg: string) {
        if (!seg.startsWith('/')) {
            this.path += '/';
        }

        this.path += seg;
        return this;
    }

    public setContentType(type: ContentType) {
        return this.setHeader("Content-Type", type);
    }

    public bearerAuth(token: string) {
        this.setHeader("Authorization", "Bearer " + token);
        return this;
    }

    public setParams(params: any) {
        this.params = params;
        return this;
    }

    async execute<T, E>(): Promise<ApiResponse<T, E>> {
        console.log(this);

        let config: AxiosRequestConfig = {
            url: this.path,
            method: this._method,
            headers: this.headers,
            data: this.body,
            params: this.params
        }

        try {
            const responce: AxiosResponse<T> = await axios.request(config);
            console.log(responce.data);
            return responce.data;
        } catch (error) {
            const err = error as AxiosError<ApiError<E>>;
            //TODO: Proper typechecks for api repsonce

            let responce = err.response;
            if (responce) {
                console.log(responce.data);
                return responce.data;
            } else {
                console.log("No error data recieved");
                return undefined;
            }
        }
    }
}

class GetRequest extends ApiRequest {
    _method = "GET" as Method;

    constructor(path: string) {
        super(path);
    }
}

class PostRequest extends ApiRequest {
    _method = "POST" as Method;

    constructor(path: string) {
        super(path);
    }

    json(body: object) {
        return this.setContentType(ContentType.JSON)
            .setBody(body);
    }

    formData(data: FormData) {
        return this.setContentType(ContentType.FormData)
            .setBody(data);
    }
}

class PutRequest extends ApiRequest {
    _method = "PUT" as Method;

    constructor(path: string) {
        super(path);
    }

    json(body: object) {
        return this.setContentType(ContentType.JSON)
            .setBody(body);
    }

    formData(data: FormData) {
        return this.setContentType(ContentType.FormData)
            .setBody(data);
    }
}

class DeleteRequest extends ApiRequest {
    _method = "DELETE" as Method;

    constructor(path: string) {
        super(path);
    }
}

export default Object.freeze(new Api());

import Media from "./media";
import Auth from "./auth";
import Licenses from "./licenses";
import Users from "./users";

export { Media, Auth, Licenses, Users };