let host = window.location.origin + "/api";

function createUrl(path: string) {
    return host + path;
}

console.log(host);

export const requestNotSuccessfull = (res: Readonly<AxiosResponse>) => 
    res.status >= 400;

export const extractQuerryError = async (res: AxiosResponse) =>
    res.data as string;

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

    async throwQueryError(res: AxiosResponse): Promise<never> {
        throw apiError(res, extractQuerryError, "Login error");
    }

    
}

type ContentType = "application/json";

import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios'

abstract class ApiRequest {
    private path: string;
    private body: any | null = null;
    private headers: Record<string, string> = {};
    protected abstract _method: Method;

    constructor(path: string) {
        this.path = path;
    }

    protected setHeader(name: string, value: string) {
        this.headers[name] = value;
        return this;
    }

    public appendSegment(seg: string) {
        if (!seg.startsWith('/')) {
            this.path += '/';
        }

        this.path += seg;
        return this;
    }

    setContentType(type: ContentType) {
        return this.setHeader("Content-Type", type);
    }

    setBody(body: any) {
        this.body = body;
        return this;
    }

    json(body: object) {
        return this.setContentType("application/json")
            .setBody(body);
    }

    bearerAuth(token: string) {
        this.setHeader("Authorization", "Bearer " + token);
        return this;
    }

    async execute() {
        console.log(this);

        let config: AxiosRequestConfig = {
            url: this.path,
            method: this._method,
            headers: this.headers
        }

        if (this.body) {
            config.data = this.body;
        }

        return await axios.request(config);
    }
}

class PostRequest extends ApiRequest {
    _method = "POST" as Method;

    constructor(path: string) {
        super(path);
    }
}

class GetRequest extends ApiRequest {
    _method = "GET" as Method;

    constructor(path: string) {
        super(path);
    }
}

class PutRequest extends ApiRequest {
    _method = "PUT" as Method;

    constructor(path: string) {
        super(path);
    }
}

export default Object.freeze(new Api());

export async function apiError(res: AxiosResponse, ext: (res: AxiosResponse) => Promise<string>, name: string): Promise<Error> {
    const errMessage = await ext(res);
    const err = new Error(name);
    err.message = errMessage;

    return err;
}