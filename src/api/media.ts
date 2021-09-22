import api from "./api";
import auth, { AuthToken } from "./auth";

import { isMediaKey, MaterialInfo, MaterialKey, MediaInfo, MediaKey, RegisterMedia, Review, ReviewInfo, UserReview } from '@/model/media';
import { AxiosResponse } from "axios";
import { UserKey } from "@/model/userinfo";

export interface Options {
    authorName: string
}

class Media {
    async getMedia(options?: Options): Promise<MediaInfo[]>;
    async getMedia(id: MediaKey): Promise<MediaInfo>;
    async getMedia(options?: MediaKey | Options) {
        let path: string;

        if (!options) {
            path = "/media";
        } else if (isMediaKey(options)) {
            path = "/media/" + options;
        } else {
            path = "";
        }

        const res: AxiosResponse = await api.get(path)
            .execute();

        if (res.status >= 400) {
            await api.throwQueryError(res);
        }

        return res.data;
    }

    async getAuthorsMedia(id: UserKey): Promise<MediaInfo[]> {
        const res: AxiosResponse<MediaInfo[]> = await api.get("/media?author_id=" + id)
            .execute();

        if (res.status >= 400) {
            await api.throwQueryError(res);
        }

        return res.data;
    }

    async getMaterials(id: MediaKey): Promise<MaterialInfo[]> {
        const res: AxiosResponse<MaterialInfo[]> = await api.get("/media/" + id + "/materials")
            .execute();

        if (res.status >= 400) {
            await api.throwQueryError(res);
        }

        return res.data;
    }

    async getMaterial(id: MaterialKey): Promise<MaterialInfo> {
        const res: AxiosResponse<MaterialInfo> = await api.get("/media/materials/" + id)
            .execute();

        if (res.status >= 400) {
            await api.throwQueryError(res);
        }

        return res.data;
    }

    async isMaterialUsed(id: MaterialKey, token: AuthToken): Promise<boolean> {
        const res: AxiosResponse<boolean> = await api.get("/media/materials/" + id + "?used")
            .bearerAuth(token)
            .execute();

        if (res.status >= 400) {
            await api.throwQueryError(res);
        }

        return res.data;
    }

    async getReviews(id: MediaKey): Promise<UserReview[]> {
        const res = await api.get("/media/" + id + "/reviews")
            .execute();

        if (res.status >= 400) {
            await api.throwQueryError(res);
        }

        return await res.data;
    }

    async postReview(id: MediaKey, review: Review, authToken: string): Promise<void> {
        const token = authToken;

        if (!token) {
            throw {};
        }

        const res = await api.put("/media/" + id + "/reviews")
            .bearerAuth(token)
            .json(review)
            .execute();

        if (res.status >= 400) {
            await api.throwQueryError(res);
        }

        res.data;
    }
/*
    async regMedia(regMedia: RegisterMedia) : Promise<RegisterMediaResponce> {

    }*/
}

export default new Media();