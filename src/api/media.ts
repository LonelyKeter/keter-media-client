import api from "./api";
import auth from "./auth";

export interface Options {

}

class Media {
    async getMedia(options?: bigint | Options) {
        let res;

        if (!options) {
            res = await api.get("/media")
                .executeNoBody();

            if (res.status >= 400) {
                api.throwQueryError(res);
            } else {
                return await res.json();
            }
        }
    }
}

export default new Media();