import Api, { ApiResponse } from "@/api"

export type AuthToken = string;

class Auth {
    async login(email: string, password: string): Promise<ApiResponse<AuthToken, null>> {
        let loginData = {
            email,
            password
        };

        return await Api.post("/auth/login")
            .json(loginData)
            .execute();
    }     
}

export default new Auth();