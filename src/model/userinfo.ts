export interface UserInfo {
    id: bigint;
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