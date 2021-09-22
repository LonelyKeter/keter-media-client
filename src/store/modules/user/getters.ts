import { UserKey } from "@/model/userinfo";
import { GetterTree } from "vuex";
import { UserState } from "./state";
import { State } from "@/store";

export type Getters = {
    isCurrentUser(state: UserState): (id: UserKey) => boolean,
    loggedIn(state: UserState): boolean
}

export const getters: GetterTree<UserState, State> & Getters = {
    isCurrentUser: (state) => (id: UserKey) =>
        state.info?.id === id,
    loggedIn: (state) => !!state.token
}