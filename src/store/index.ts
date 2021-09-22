import { createStore, Store as VuexStore} from 'vuex'

import { user, UserState, UserGetters } from './modules/user';
export {  UserMutationTypes } from './modules/user';

import createPersistedState from 'vuex-persistedstate';

export interface State {
    user: UserState
}

type Getters = {
    [K in keyof UserGetters]: ReturnType<UserGetters[K]>
};

export type Store = Omit<VuexStore<State>, 'getters'> & {
    getters: Getters
}

const store = createStore<State>({
  modules: {
    user
  },
  plugins: [createPersistedState()]
});

export default store;