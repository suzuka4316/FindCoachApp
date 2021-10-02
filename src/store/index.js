import Vuex from 'vuex'

import coachesModule from './modules/coaches/index.js'
import requestsModule from './modules/requests/index.js'

export const store = new Vuex.Store({
  modules: {
    coaches: coachesModule,
    requests: requestsModule
  },
  state() {
    return {
      userId: 'c1'
    }
  },
  getters: {
    userId(state) {
      return state.userId
    }
  }
})

export const createStore = new Vuex.Store({})