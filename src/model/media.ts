import { AuthorInfo, UserInfo } from "@/model/userinfo";

export type MediaKey = number;
export const toMediaKey = (val: any) => Number(val);
export const isMediaKey = (val: any) => typeof val === 'number'; 
export const mediaKeyConstructor = BigInt; 
 
export type MediaKind = "Video" | "Audio" | "Image";

export interface MediaInfo {
    id: MediaKey,
    title: string,
    kind: MediaKind,
    author: AuthorInfo,
    rating: number,
}

export type MaterialKey = number;
export const toMaterialKey = (val: any) => Number(val);
export const isMaterialKey = (val: any) => typeof val === 'number'; 
export type Quality = "Very low" | "Low" | "Medium" | "High" | "Very high";
export type MaterialSize = number;

export interface MaterialInfo {
    id: MaterialKey,
    mediaId: MediaKey,
    format: string,
    quality: Quality,
    size: MaterialSize,
    licenseName: string,
}

export type ReviewRating = number;
export type ReviewKey = number;

export interface UserReview extends ReviewInfo{
    userInfo: UserInfo,
}

export interface ReviewInfo extends Review{
    id: ReviewKey,   
    date: Date 
}

export interface Review {
    rating: ReviewRating,
    text?: String,
}

export type RegisterMedia = {
    title: string,
    kind: MediaKind,
    tags: string[],
    defaultLicense?: string
};

export type RegisterMediaResponce = {
    success: boolean
};

export function checkTitle(title: string) {
    if (title.length > 0) {
        return TitleError.Ok;
    } else {
        return TitleError.MissingTitle
    }
};

export enum TitleError {
    Ok = "OK",
    MissingTitle = "Missing title"
}

export function checkKind(kind: MediaKind | "") {
    if (kind != "") {
        return KindError.Ok
    } else {
        return KindError.MissingKind
    }
};

export enum KindError {
    Ok = "OK",
    MissingKind = "Missing kind"
}