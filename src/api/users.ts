import { FilterOrdering } from "@/model";
import { MediaKind } from "@/model/media";
import { Usage } from "@/model/usage";
import { AuthorInfo, UserInfo, UserKey, UserPriveleges } from "@/model/userinfo";
import api, {ApiResponse} from ".";

export type AuthorsOptions = {
    name?: string,
    kinds?: MediaKind[],
    min_rating?: number,
    max_rating?: number,
    rating_ordering?: FilterOrdering 
}

class Users {
    async getUserInfo(id: UserKey) : Promise<ApiResponse<UserInfo, null>> {
        return await api.get("/users/" + id)
            .execute();
    }

    async getAuthors(options?: AuthorsOptions): Promise<ApiResponse<AuthorInfo[], null>> {
        return await api.get("/users/authors")
            .setParams(options)
            .execute();
    }

    async getSelf(authToken: string): Promise<ApiResponse<UserInfo, null>> {
        return await api.get('/users/self')
            .bearerAuth(authToken)
            .execute();
    }

    async getSelfPriveleges(authToken: string) : Promise<ApiResponse<UserPriveleges, null>> { 
        return await api.get('/users/self/priveleges')
            .bearerAuth(authToken)
            .execute();
    }   

    async getUsages(userId: UserKey): Promise<ApiResponse<Usage[], null>> {
        return await api.get("/users/" + userId + "/usages")
            .execute();
    }
}

export default new Users();