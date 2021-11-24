let host = window.location.origin + "/api";

function createUrl(path: string) {
    return host + path;
}

type NonUndefined<T> = T extends undefined ? never : T;

export type ApiError<E> = {
    errorKind: "DB",
    payload: { message: string }
} | {
    errorKind: "No responce data",
} | {
    errorKind: "General error responce",
    error: {
        code: number,
        description: string,
        reason: string
    }
} | {
    errorKind: string,
    payload: NonUndefined<E>
} | undefined;

export function isApiError<T, E>(response: ApiResponse<T, E>): response is ApiError<E> {
    return (response === undefined || (response !== null && (typeof response === "object" && "errorKind" in response)));
}

export function isApiSuccess<T, E>(response: ApiResponse<T, E>): response is NonUndefined<T> {
    return !isApiError(response);
}

export type ApiResponse<T, E> = NonUndefined<T> | ApiError<E>;

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

    get host() {
        return host;
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

    public bearerAuth(token?: AuthToken) {
        if (token) {
            this.setHeader("Authorization", "Bearer " + token);
        }
        return this;
    }

    public setParams(params: any) {
        this.params = params;
        return this;
    }

    async execute<T, E>(): Promise<ApiResponse<T, E>> {
        let config: AxiosRequestConfig = {
            url: this.path,
            method: this._method,
            headers: this.headers,
            data: this.body,
            params: this.params
        }

        try {
            const responce: AxiosResponse<T> = await axios.request(config);

            if (process.env?.NODE_ENV === "development") {
                this.logExecution(responce.status, responce.data)
            }

            return responce.data as NonUndefined<T>;
        } catch (error) {
            const err = error as AxiosError<ApiError<E>>;
            //TODO: Proper typechecks for api repsonce
            const responce = err.response;
            const data = responce?.data;

            if (data) {
                if ("error" in data) {
                    data.errorKind = "General error responce"
                }

                console.log({
                    path: this.path,
                    data: data
                });
            } else {
                console.log("No error data recieved");
            }

            if (process.env?.NODE_ENV === "development") {
                this.logExecution(responce?.status, data);
            }

            return data;
        }
    }

    logExecution(status?: number, data?: any) {
        console.log({
            path: this.path,
            request: {
                method: this._method,
                headers: this.headers,
                data: this.body
            },
            responce: {
                status: status,
                data: data
            }
        });
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
import Auth, { AuthToken } from "./auth";
import Licenses from "./licenses";
import Users from "./users";
import { getTransitionRawChildren } from '@vue/runtime-core';

export { Media, Auth, Licenses, Users };