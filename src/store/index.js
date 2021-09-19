import Vuex from 'vuex'

import coachesModule from './modules/coaches/index.js'
import requestsModule from './modules/requests/index.js'

export const store = new Vuex.Store({
  modules: {
    coaches: coachesModule,
    requests: requestsModule
  }
})

export const createStore = new Vuex.Store({})