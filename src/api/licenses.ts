import { License, LicenseKey } from "@/model/usage";
import api, {ApiResponse} from ".";

class Licenses {
    async getLicense(key: number | string) : Promise<ApiResponse<License, null>> {
        return await api.get("/licenses/" + key)
            .execute();
    }

    async getLicenses() : Promise<ApiResponse<License[], null>> {
        return await api.get("/licenses")
            .execute();
    }
}

export default new Licenses();