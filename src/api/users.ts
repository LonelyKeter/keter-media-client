import { License } from "@/model/usage";
import { UserInfo, UserKey } from "@/model/userinfo";
import { AxiosResponse } from "axios";
import api, {apiError, extractQuerryError, requestNotSuccessfull} from "./api";

class Users {
    async getUserInfo(id: UserKey) : Promise<UserInfo> {
        const responce: AxiosResponse<UserInfo> = await api.get("/users/" + id)
            .execute();

        if (requestNotSuccessfull(responce)) {
            throw apiError(
                responce,
                extractQuerryError,
                "UsersApi error"                
            )
        } else {
            return responce.data; 
        }
    }
}

export default new Users();