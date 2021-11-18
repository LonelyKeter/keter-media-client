import { Usage } from "@/model/usage";
import { UserInfo, UserKey, UserPriveleges } from "@/model/userinfo";
import api, {ApiResponse} from ".";

class Users {
    async getUserInfo(id: UserKey) : Promise<ApiResponse<UserInfo, null>> {
        return await api.get("/users/" + id)
            .execute();
    }

    async loadSelf(authToken: string): Promise<ApiResponse<UserInfo, null>> {
        return await api.get('/users/self')
            .bearerAuth(authToken)
            .execute();
    }

    async loadSelfPrivelegies(authToken: string) : Promise<ApiResponse<UserPriveleges, null>> { 
        return await api.get('/users/self/priveleges')
            .bearerAuth(authToken)
            .execute();
    }   

    async loadUsages(userId: UserKey): Promise<ApiResponse<Usage[], null>> {
        return await api.get("/users/" + userId + "/usages")
            .execute();
    }
}

export default new Users();