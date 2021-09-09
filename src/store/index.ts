import { createStore, useStore as baseUseStore, Store, ModuleTree } from 'vuex'
import { InjectionKey } from 'vue'

import { user, UserState } from './modules/user'

export interface State {
    user: UserState
}

const store = createStore<State>({
  modules: {
    user
  } 
});

export default store;