import { AuthorInfo, UserInfo } from "@/model/userinfo";
import { RangeFilter } from ".";

export type MediaKey = number;
export const toMediaKey = (val: any) => Number(val);
export const isMediaKey = (val: any): val is MaterialKey => typeof val === 'number'; 
export const MediaKeyConstructor = Number; 

export type Count = number;
export const toCount = (val: any) => Number(val);
export const isCount = (val: any): val is Count => typeof val === 'number'; 
export const CountConstructor = Number; 

export type Rating = number;
export const toRating = (val: any) => Number(val);
export const isRating = (val: any): val is Rating => typeof val === 'number'; 
export const RatingConstructor = Number; 
 
export type MediaKind = "Video" | "Audio" | "Image";

export interface MediaInfo {
    id: MediaKey,
    title: string,
    kind: MediaKind,
    author: AuthorInfo,
    rating?: Rating,
    use_count: Count
}

export type MaterialKey = number;
export const toMaterialKey = (val: any) => Number(val);
export const isMaterialKey = (val: any) => typeof val === 'number'; 

export enum Quality {
    VeryLow = "Very low",
    Low = "Low",
    Medium = "Medium",
    High = "High",
    VeryHigh = "Very high"
}

export interface MediaFilterOptions {
    title?: string,
    kinds?: MediaKind[],
    popularity?: RangeFilter,
    timesUsed?: RangeFilter
}

export type MaterialSize = number;

export interface MaterialInfo {
    id: MaterialKey,
    mediaId: MediaKey,
    format: string,
    quality: Quality,
    licenseName: string,
    rating?: Rating,
    use_count: Count,
    isUsed: boolean | null
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
    text: String,
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