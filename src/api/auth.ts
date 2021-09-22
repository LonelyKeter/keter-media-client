import Api, { apiError } from "@/api/api"
import { UserInfo, UserPriveleges} from "@/model/userinfo";
import { AxiosResponse } from "axios";

export type AuthToken = string;

function throwNoToken(): never {
    throw {
        name: "Auth error",
        message: "No token"
    };
}

class Auth {
    async login(email: string, password: string): Promise<AuthToken> {
        let loginData = {
            email,
            password
        };

        const responce: AxiosResponse<string> = await Api.post("/auth/login")
            .json(loginData)
            .execute();

        if (authNotSuccesful(responce)) {
            throw await apiError(
                responce, 
                this.extractErrData, 
                "Login error");
        } else {
            return await this.extractAuthToken(responce);
        }
    }    

    async getInfo(authToken: string): Promise<UserInfo> {
        const responce: AxiosResponse<UserInfo> = await Api.get('/auth/self')
            .bearerAuth(authToken)
            .execute();

        if (authNotSuccesful(responce)) {
            throw await apiError(
                responce, 
                this.extractErrData, 
                "AuthApi error");
        } else {
            return await responce.data;
        }
    }

    async getPrivelegies(authToken: string) : Promise<UserPriveleges> { 
        const responce: AxiosResponse<UserPriveleges> = await Api.get('/auth/privelegies')
            .bearerAuth(authToken)
            .execute();

        if (authNotSuccesful(responce)) {
            throw await apiError(
                responce, 
                this.extractErrData, 
                "AuthApi error");
        } else {
            return await responce.data;
        }
    }

    private async extractAuthToken(responce: AxiosResponse) : Promise<AuthToken> {
        return await responce.data;
    }

    private async extractErrData(responce: AxiosResponse) {
        return await responce.data;
    }
}

function authNotSuccesful(responce: Readonly<AxiosResponse<any>>) {
    return responce.status >= 400;
}

export default new Auth();