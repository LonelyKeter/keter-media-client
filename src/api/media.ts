import api from "./api";
import auth from "./auth";

import { MaterialInfo, MediaInfo } from '@/model/media';

export interface Options {
    authorName: string
}

class Media {
    async getMedia(options?: Options): Promise<MediaInfo[]>;
    async getMedia(id: bigint): Promise<MediaInfo>;
    async getMedia(options?: bigint | Options) {
        let path: string;

        if (!options) {
            path = "/media";
        } else if (typeof options === 'bigint') {
            path = "/media/" + options;
        } else {
            path = "";
        }

        const res = await api.get(path)
            .execute();

        if (res.status >= 400) {
            await api.throwQueryError(res);
        }

        return await res.json();
    }

    async getMaterials(id: bigint): Promise<MaterialInfo> {
        const res = await api.get("/media/" + id + "/materials")
            .execute();

        if (res.status >= 400) {
            await api.throwQueryError(res);
        } 
            
        return await res.json();
    }
}

export default new Media();