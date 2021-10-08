import { Usage } from "@/model/usage";
import { UserInfo, UserKey, UserPriveleges } from "@/model/userinfo";
import api, {ApiResponse} from ".";

class Users {
    async getUserInfo(id: UserKey) : Promise<ApiResponse<UserInfo, null>> {
        return await api.get("/users/" + id)
            .execute();
    }

    async getSelf(authToken: string): Promise<ApiResponse<UserInfo, null>> {
        return await api.get('/users/self')
            .bearerAuth(authToken)
            .execute();
    }

    async getSelfPrivelegies(authToken: string) : Promise<ApiResponse<UserPriveleges, null>> { 
        return await api.get('/users/self/privelegies')
            .bearerAuth(authToken)
            .execute();
    }   

    async getUsages(userId: UserKey): Promise<ApiResponse<Usage[], null>> {
        return await api.get("/users/" + userId + "/usages")
            .execute();
    }
}

export default new Users();