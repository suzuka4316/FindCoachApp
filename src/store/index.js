import Vuex from 'vuex'

import coachesModule from './modules/coaches/index.js'
import requestsModule from './modules/requests/index.js'
import authModule from './modules/auth/index.js'

export const store = new Vuex.Store({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule,
  },
})

export const createStore = new Vuex.Store({})