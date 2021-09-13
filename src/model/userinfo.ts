export type UserKey = bigint;

export interface UserInfo {
    id: UserKey;
    name: string;
}

export interface AuthorInfo extends UserInfo {
    country: string
}

export interface UserPrivelegies {
    author: boolean;
    moderator: boolean;
    admin: boolean;
}