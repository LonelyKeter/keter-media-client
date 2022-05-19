import api, { ApiResponse, ApiError } from ".";
import auth, { AuthToken } from "./auth";

import { isMediaKey, MaterialInfo, MaterialKey, MediaInfo, MediaKey, MediaKind, Quality, RegisterMedia, Review, ReviewInfo, UserRating, UserReview } from '@/model/media';
import axios, { AxiosError, AxiosResponse } from "axios";
import { UserKey } from "@/model/userinfo";
import { LicenseKey, Usage, UserUsage } from "@/model/usage";
import { FilterOrdering } from "@/model";

export interface Options {
    title?: string,
    kinds?: MediaKind[],
    min_rating?: number,
    max_rating?: number,
    min_use_count?: number,
    max_use_count?: number,
    rating_ordering?: FilterOrdering,
    use_count_ordering?: FilterOrdering,
}

export type MaterialDownloadToken = string;

class Media {
    async getMedia(options?: Options): Promise<ApiResponse<MediaInfo[], null>>;
    async getMedia(id: MediaKey): Promise<ApiResponse<MediaInfo, null>>;
    async getMedia(options?: MediaKey | Options) {
        if (!options) {
            return await api.get("/media")
                .execute<MediaInfo[], null>();
        } else if (isMediaKey(options)) {
            return await api.get("/media/" + options)
                .execute<MediaInfo, null>();
        } else {
            return await api.get("/media")
                .setParams(options)
                .execute<MediaInfo[], null>()
        }
    }

    async getAuthorsMedia(id: UserKey): Promise<ApiResponse<MediaInfo[], null>> {
        return await api.get("/media?author_id=" + id)
            .execute();
    }

    async getMaterials(id: MediaKey, token?: AuthToken): Promise<ApiResponse<MaterialInfo[], null>> {
        return await api.get("/media/" + id + "/materials")
            .bearerAuth(token)
            .execute();
    }

    async getMaterial(id: MaterialKey, token?: AuthToken): Promise<ApiResponse<MaterialInfo, null>> {
        return await api.get("/media/materials/" + id)
            .bearerAuth(token)
            .execute();
    }

    async useMaterial(id: MaterialKey, token: AuthToken): Promise<ApiResponse<null, null>> {
        return await api.post("/media/materials/" + id + "/usages")
            .bearerAuth(token)
            .json({})
            .execute();
    }

    async getMaterialUsageUserId(id: MaterialKey, userId: UserKey): Promise<ApiResponse<Usage, null>> {
        return await api.get("/media/materials/" + id + "/usages?user_id=" + userId)
            .execute();
    }

    async getReviews(id: MediaKey): Promise<ApiResponse<UserReview[], null>> {
        return await api.get("/media/" + id + "/reviews")
            .execute();
    }

    async postReview(id: MediaKey, review: Review, token: AuthToken): Promise<ApiResponse<null, null>> {
        return await api.post("/media/" + id + "/reviews")
            .bearerAuth(token)
            .json(review)
            .execute();
    }

    async putMeterialRating(id: MaterialKey, rating: UserRating, token: AuthToken): Promise<ApiResponse<null, null>> {
        return await api.put("/media/materials/" + id + "/rating")
            .bearerAuth(token)
            .json(rating)
            .execute()
    }

    async postMaterial(mediaId: MediaKey, payload: UploadMaterial, authToken: AuthToken): Promise<ApiResponse<null, string>> {
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

    async deleteMaterial(materialId: MaterialKey, authToken: AuthToken): Promise<ApiResponse<null, null>> {
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

    async regMedia(regMedia: RegisterMedia, token: AuthToken) : Promise<ApiResponse<MediaKey, null>> {
        return await api.post("/media")
            .bearerAuth(token)
            .json(regMedia)
            .execute();
    }

    async getMaterialDownloadToken(materialId: MaterialKey, authToken: AuthToken) : Promise<ApiResponse<AuthToken, null>> {
        return await api.get("/media/materials/" + materialId + "/token")
            .bearerAuth(authToken)
            .execute();
    }

    createMaterialDownloadURL(downloadToken: MaterialDownloadToken) : string {
        return api.host + "/media/materials/download?token=" + downloadToken;
    }
}

export type UploadMaterial = {
    quality: Quality;
    file: File;
    format: string,
    license_id: LicenseKey
};

export default new Media();