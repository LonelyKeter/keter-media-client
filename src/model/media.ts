import { AuthorInfo } from "@/model/userinfo";

export type MediaKey = bigint;
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