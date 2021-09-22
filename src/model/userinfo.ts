export type UserKey = number;

export interface UserInfo {
    id: UserKey;
    name: string;
}

export interface AuthorInfo extends UserInfo {
    country: string
}

export interface UserPriveleges {
    author: boolean;
    moderator: boolean;
    admin: boolean;
}