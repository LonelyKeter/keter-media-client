import { AuthToken } from "@/api/auth";
import { UserInfo, UserKey, UserPriveleges } from "@/model/userinfo";

export interface UserState {
    info?: UserInfo;
    privelegies?: UserPriveleges;
    token?: AuthToken;
}

export const state: UserState = {};