import api, { ApiResponse, ApiError } from ".";
import auth, { AuthToken } from "./auth";

import { isMediaKey, MaterialInfo, MaterialKey, MediaInfo, MediaKey, Quality, RegisterMedia, Review, ReviewInfo, UserReview } from '@/model/media';
import axios, { AxiosError, AxiosResponse } from "axios";
import { UserKey } from "@/model/userinfo";
import { LicenseKey, UserUsage } from "@/model/usage";

export interface Options {
    authorName: string
}

class Media {
    async getMedia(options?: Options): Promise<ApiResponse<MediaInfo[], null>>;
    async getMedia(id: MediaKey): Promise<ApiResponse<MediaInfo, null>>;
    async getMedia(options?: MediaKey | Options) {
        let path: string;

        if (!options) {
            return await api.get("/media")
                .execute<MediaInfo[], null>();
        } else if (isMediaKey(options)) {
            return await api.get("/media/" + options)
                .execute<MediaInfo, null>();
        } else {
            throw "Unimplimented media request";
        }
    }

    async getAuthorsMedia(id: UserKey): Promise<ApiResponse<MediaInfo[], null>> {
        return await api.get("/media?author_id=" + id)
            .execute();
    }

    async getMaterials(id: MediaKey): Promise<ApiResponse<MaterialInfo[], null>> {
        return await api.get("/media/" + id + "/materials")
            .execute();
    }

    async getMaterial(id: MaterialKey): Promise<ApiResponse<MaterialInfo, null>> {
        return await api.get("/media/materials/" + id)
            .execute();
    }

    async useMaterial(id: MaterialKey, token: AuthToken): Promise<ApiResponse<null, null>> {
        return await api.post("/media/materials/" + id + "?use")
            .bearerAuth(token)
            .execute();
    }

    async isMaterialUsed(id: MaterialKey, token: AuthToken): Promise<ApiResponse<boolean, null>> {
        return await api.get("/media/materials/" + id + "?used")
            .bearerAuth(token)
            .execute();
    }

    async getReviews(id: MediaKey): Promise<ApiResponse<UserReview[], null>> {
        return await api.get("/media/" + id + "/reviews")
            .execute();
    }

    async postReview(id: MediaKey, review: Review, token: string): Promise<ApiResponse<null, null>> {
        return await api.post("/media/" + id + "/reviews")
            .bearerAuth(token)
            .json(review)
            .execute();
    }

    async postMaterial(mediaId: MediaKey, payload: UploadMaterial, authToken: string): Promise<ApiResponse<null, string>> {
        const data = new FormData();

        data.append("file", payload.file);

        return await api.post("/media/materials")
                .bearerAuth(authToken)
                .formData(data)
                .setParams({
                    media: mediaId,
                    quality: payload.quality,
                    format: payload.format,
                    license: payload.license_id
                })
                .execute();
    }

    async deleteMaterial(materialId: MaterialKey, authToken: string): Promise<ApiResponse<null, null>> {
        return await api.delete("/media/materials/" + materialId)
            .execute();
    }

    async getMediaUsages(mediaId: MediaKey): Promise<ApiResponse<UserUsage[], null>> {
        return await api.get("/media/" + mediaId + "/usages")
            .execute();
    }

    async getMaterialUsages(materialId: MaterialKey): Promise<ApiResponse<UserUsage[], null>> {
        return await api.get("/media/materials/" + materialId + "/usages")
            .execute();
    }
    /*
        async regMedia(regMedia: RegisterMedia) : Promise<RegisterMediaResponce> {
    
        }*/
}

export type UploadMaterial = {
    quality: Quality;
    file: File;
    format: string,
    license_id: LicenseKey
};

export default new Media();