import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  contexts: [],
  namespaces: [],
  releases: []
}

const mutations = {
  SET_CONTEXTS(state, contexts) {
    state.contexts = contexts
  },
  SET_NAMESPACES(state, namespaces) {
    state.namespaces = namespaces
  },
  SET_RELEASES(state, releases) {
    state.releases = releases
  }
}

const actions = {
  setContexts({ commit }, contexts) {
    commit('SET_CONTEXTS', contexts)
  },
  setNamespaces({ commit }, namespaces) {
    commit('SET_NAMESPACES', namespaces)
  },
  setReleases({ commit }, releases) {
    commit('SET_RELEASES', releases)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
