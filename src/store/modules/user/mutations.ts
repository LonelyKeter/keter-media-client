export enum UserMutationTypes {
    SET_AUTH_TOKEN = "SET_AUTH_TOKEN",
    SET_USER_INFO = "SET_USER_INFO",
    SET_USER_PRIVELEGES = "SET_USER_PRIVELEGES",
    RESET_USER = "RESET_USER"  
}


import { AuthToken } from "@/api/auth";
import { UserInfo, UserPriveleges as UserPriveleges } from "@/model/userinfo";
import { MutationTree } from "vuex";
import { UserState } from "./state"; 

export type Mutations<S = UserState> = {
    [UserMutationTypes.SET_USER_INFO](state: S, payload: UserInfo): void,
    [UserMutationTypes.SET_USER_INFO](state: S, payload: UserInfo): void,
    [UserMutationTypes.SET_USER_PRIVELEGES](state: S, payload: UserPriveleges): void,
    [UserMutationTypes.RESET_USER](state: S): void
}

export const mutations: MutationTree<UserState> & Mutations = {    
    [UserMutationTypes.SET_AUTH_TOKEN](state: UserState, token: AuthToken) {
        state.token = token;
    },
    [UserMutationTypes.SET_USER_INFO](state: UserState, info: UserInfo) {
        state.info = info;
    },
    [UserMutationTypes.SET_USER_PRIVELEGES](state: UserState, privs: UserPriveleges) {
        state.privelegies = privs;
    },
    [UserMutationTypes.RESET_USER](state: UserState) {
        state.token = undefined;
        state.info = undefined;
        state.privelegies = undefined;
    } 
}