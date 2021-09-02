let host = window.location.origin + "/api";

console.log(host);

class Api {  
  get(path) {
      return new GetRequest(this.createUrl(path))
  }

  post(path) {
      return new PostRequest(this.createUrl(path));
  }

  createUrl(path) {
      return host + path;
  }
}

class ApiRequest {
    #path = "";
    #body = "";
    #headers = new Headers();
    _method = "";

    constructor(path) {
        this.#path = String(path);
    }

    setContentType(type) {
        this.#headers.append("Content-Type", type);
        return this;
    }

    setBody(body) {
        this.#body = body;
        return this;
    }

    json(body) {
        this.setContentType("application/json");
        this.setBody(JSON.stringify(body));
        return this;
    }

    async execute() {
        console.log(this);

        return await fetch(this.#path, {
          method: this._method,
          body: String(this.#body),
          headers: this.#headers,
        });
    }
}

class PostRequest extends ApiRequest {    
    constructor(path) {
        super(path);

        this._method = "POST";
    }
}

class GetRequest extends ApiRequest {    
    constructor(path) {
        super(path);

        this._method = "GET";
    }
}

export default Object.freeze(new Api());