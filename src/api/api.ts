let host = window.location.origin + "/api";

console.log(host);

class Api {
    get(path: string) {
        return new GetRequest(this.createUrl(path))
    }

    post(path: string) {
        return new PostRequest(this.createUrl(path));
    }

    private createUrl(path: string) {
        return host + path;
    }

    async throwQueryError(res: Response): Promise<never> {
        throw apiError(res, this.extractQuerryError, "Login error");
    }

    async extractQuerryError(res: Response): Promise<string> {
        return await res.text() as string;
    }
}

type RequestMethod = "GET" | "POST";
type ContentType = "application/json";



abstract class ApiRequest {
    private path: string;
    private body: BodyInit | null = null;
    private headers = new Headers();
    protected abstract _method: RequestMethod;

    constructor(path: string) {
        this.path = path;
    }

    protected setHeader(name: string, value: string) {
        this.headers.append(name, value);
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

    setBody(body: BodyInit) {
        this.body = body;
        return this;
    }

    json(body: object) {
        return this.setContentType("application/json")
            .setBody(JSON.stringify(body));
    }

    bearerAuth(token: string) {
        this.setHeader("Authorization", "Bearer " + token);
        return this;
    }

    async execute() {
        console.log(this);
        let init: RequestInit = {
            method: this._method,
            headers: this.headers,
        };

        if (this.body) {
            init.body = this.body;
        }

        return await fetch(this.path, {
            method: this._method,
            body: this.body,
            headers: this.headers,
        });
    }
}

class PostRequest extends ApiRequest {
    _method = "POST" as RequestMethod;

    constructor(path: string) {
        super(path);
    }
}

class GetRequest extends ApiRequest {
    _method = "GET" as RequestMethod;

    constructor(path: string) {
        super(path);
    }
}

export default Object.freeze(new Api());

export async function apiError(res: Response, ext: (res: Response) => Promise<string>, name: string): Promise<Error> {
    const errMessage = await ext(res);
    const err = new Error(name);
    err.message = errMessage;

    return err;
}