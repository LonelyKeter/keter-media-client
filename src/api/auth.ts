import Api, { apiError } from "@/api/api"
import { UserInfo, UserPrivelegies} from "@/model/userinfo";

function throwNoToken(): never {
    throw {
        name: "Auth error",
        message: "No token"
    };
}

class Auth {
    private _token: string | null = null;

    async login(email: string, password: string) {
        let loginData = {
            email,
            password
        };

        const responce = await Api.post("/auth/login")
            .json(loginData)
            .execute();

        if (authNotSuccesful(responce)) {
            throw await apiError(
                responce, 
                this.extractErrData, 
                "Login error");
        } else {
            this._token = await this.extractAuthToken(responce);
        }
    }

    async getInfo(): Promise<UserInfo> {
        if (!this._token) {
            throwNoToken();
        }

        const responce = await Api.get('/auth/self')
            .bearerAuth(this._token)
            .execute();

        if (authNotSuccesful(responce)) {
            throw await apiError(
                responce, 
                this.extractErrData, 
                "AuthApi error");
        } else {
            return await responce.json();
        }
    }

    async getPrivelegies() : Promise<UserPrivelegies> {        
        if (!this._token) {
            throwNoToken();
        }

        const responce = await Api.get('/auth/privelegies')
            .bearerAuth(this._token)
            .execute();

        if (authNotSuccesful(responce)) {
            throw await apiError(
                responce, 
                this.extractErrData, 
                "AuthApi error");
        } else {
            return await responce.json();
        }
    }

    get token() {
        return this._token;
    }

    private async extractAuthToken(responce: Response) {
        return await responce.text();
    }

    private async extractErrData(responce: Response) {
        return await responce.text();
    }
}

function authNotSuccesful(responce: Readonly<Response>) {
    return responce.status >= 400;
}

export default new Auth();