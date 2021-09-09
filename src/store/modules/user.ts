import { UserInfo, UserPrivelegies } from "@/model/userinfo";
import { Module } from "vuex";
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'

export interface UserState {
    info: UserInfo | null;
    privelegies: UserPrivelegies | null;
}

const state: UserState = {
    info: null,
    privelegies: null
};

export const user: Module<UserState, any> = {
    state,
    mutations: {
        setUserInfo(state, info: UserInfo) {
            state.info = info;
        },
        setUserPrivelegies(state, privs: UserPrivelegies) {
            state.privelegies = privs;
        }
    }
};