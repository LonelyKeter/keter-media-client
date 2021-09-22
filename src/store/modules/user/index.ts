import { UserInfo, UserKey, UserPriveleges } from "@/model/userinfo";
import { Module } from "vuex";
import { State } from "@/store";

import { state, UserState } from "./state";
import { mutations } from "./mutations";
import { getters } from "./getters";

export { UserState } from "./state";
export { UserMutationTypes } from "./mutations";
export { Getters as UserGetters } from "./getters";
export { Mutations as UserMutations } from "./mutations";

export const user: Module<UserState, State> = {
    state,
    mutations,
    getters
};