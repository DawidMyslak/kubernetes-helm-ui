import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  context: { name: null },
  namespace: { name: null },
  contexts: [],
  namespaces: [],
  releases: []
}

const mutations = {
  SET_CONTEXT(state, context) {
    state.context = context
  },
  SET_CONTEXTS(state, contexts) {
    state.contexts = contexts
  },
  SET_NAMESPACE(state, namespace) {
    state.namespace = namespace
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
  setContext({ commit }, context) {
    commit('SET_CONTEXT', context)
  },
  setNamespaces({ commit }, namespaces) {
    commit('SET_NAMESPACES', namespaces)
  },
  setNamespace({ commit }, namespace) {
    commit('SET_NAMESPACE', namespace)
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
