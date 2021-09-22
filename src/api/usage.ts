import { License } from "@/model/usage";
import { AxiosResponse } from "axios";
import api, {apiError, extractQuerryError, requestNotSuccessfull} from "./api";

class Usage {
    async getLicense(key: number | string) : Promise<License> {
        const responce: AxiosResponse<License> = await api.get("/usage/licenses/" + key)
            .execute();

        if (requestNotSuccessfull(responce)) {
            throw apiError(
                responce,
                extractQuerryError,
                "UsageApi error"                
            )
        } else {
            return responce.data; 
        }
    }
}

export default new Usage();