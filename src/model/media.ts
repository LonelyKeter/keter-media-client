import { AuthorInfo, UserInfo } from "@/model/userinfo";

export type MediaKey = bigint;
export const toMediaKey = (val: any) => BigInt(val);
export const mediaKeyConstructor = BigInt; 
 
export type MediaKind = "Video" | "Audio" | "Image";

export interface MediaInfo {
    id: MediaKey,
    title: string,
    kind: MediaKind,
    author: AuthorInfo,
    rating: number,
}

export type MaterialKey = bigint;
export type Quality = "Very low" | "Low" | "Medium" | "High" | "Very high";
export type MaterialSize = bigint;

export interface MaterialInfo {
    id: MaterialKey,
    format: string,
    quality: Quality,
    size: MaterialSize,
    licenseName: string,
    downloadLink: string,
}

export type ReviewRating = Number;
export type ReviewKey = BigInt;

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