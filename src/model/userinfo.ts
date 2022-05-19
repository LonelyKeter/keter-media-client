import { Rating } from "./media";

export type UserKey = number;

export type UserInfo = {
    id: UserKey;
    name: string;
}

export interface AuthorContacts {
    email: string
}

export type AuthorInfo = UserInfo & {
    contacts: AuthorContacts,
    rating?: Rating
}

export type AdministrationPermissions = "None" | 'Moderator' | 'Admin';

export interface UserPriveleges {
    isAuthor: boolean;
    administrationPrivelegies: AdministrationPermissions
}