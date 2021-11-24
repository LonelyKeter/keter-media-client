export type UserKey = number;

export interface UserInfo {
    id: UserKey;
    name: string;
}

export interface AuthorInfo extends UserInfo {
    country: string
}

export type AdministrationPermissions = "None" | 'Moderator' | 'Admin';

export interface UserPriveleges {
    isAuthor: boolean;
    administrationPrivelegies: AdministrationPermissions
}