import { AuthorInfo, UserInfo, UserKey } from "@/model/userinfo";
import api, { apiError } from "./api";
import auth from "./auth";

class Authors {
    async getAuthorInfo(id: UserKey) : Promise<AuthorInfo> {
        let res = await api.get("/author/" + id)
            .execute();

        if (res.status >= 400) {
            throw await apiError(
                res,
                this.extractQuerryError,
                "Authors api error"
            )
        } else {
            return await res.json();
        }
    }

    async extractQuerryError(res: Response): Promise<string> {
        return await res.text() as string;
    }
}

export default new Authors();