import Vue from 'vue'
import Vuex from 'vuex'

import kube from './tools/kube'
import helm from './tools/helm'

Vue.use(Vuex)

const state = {
  context: { name: null },
  namespace: { name: null },
  release: { name: null },
  contexts: [],
  namespaces: [],
  releases: [],
  history: [],
  logs: []
}

const mutations = {
  SET_CONTEXT(state, context) {
    state.context = context
  },
  RESET_CONTEXT_DEPENDENCIES(state) {
    state.namespace.name = null
    state.release.name = null
    state.namespaces = []
    state.releases = []
    state.history = []
  },
  SET_NAMESPACE(state, namespace) {
    state.namespace = namespace
  },
  RESET_NAMESPACE_DEPENDENCIES(state) {
    state.release.name = null
    state.releases = []
    state.history = []
  },
  SET_RELEASE(state, release) {
    state.release = release
  },
  RESET_RELEASE_DEPENDENCIES(state) {
    state.history = []
  },
  SET_CONTEXTS(state, contexts) {
    state.contexts = contexts
  },
  SET_NAMESPACES(state, namespaces) {
    state.namespaces = namespaces
  },
  SET_RELEASES(state, releases) {
    state.releases = releases
  },
  SET_HISTORY(state, history) {
    state.history = history
  },
  ADD_LOG(state, log) {
    state.logs.push(log)
  }
}

const actions = {
  applyContext({ commit }, context) {
    return kube.useContext(context.name)
      .then(() => {
        commit('SET_CONTEXT', context)
        commit('RESET_CONTEXT_DEPENDENCIES')
      })
  },
  applyNamespace({ commit }, namespace) {
    commit('SET_NAMESPACE', namespace)
    commit('RESET_NAMESPACE_DEPENDENCIES')
    return Promise.resolve()
  },
  applyRelease({ commit }, release) {
    commit('SET_RELEASE', release)
    commit('RESET_RELEASE_DEPENDENCIES')
    return Promise.resolve()
  },
  loadContexts({ commit }) {
    return kube.getContexts()
      .then((contexts) => {
        commit('SET_CONTEXTS', contexts)

        let context = contexts.find((context) => context.current === '*')
        commit('SET_CONTEXT', context)
      })
  },
  loadNamespaces({ commit }) {
    return kube.getNamespaces()
      .then((namespaces) => {
        commit('SET_NAMESPACES', namespaces)

        let namespace = namespaces[0]
        commit('SET_NAMESPACE', namespace)
      })
  },
  loadReleases({ commit, state }) {
    return helm.getReleases(state.namespace.name)
      .then((releases) => {
        commit('SET_RELEASES', releases)
      })
  },
  loadHistory({ commit, state }) {
    return helm.getHistory(state.release.name, state.namespace.name)
      .then((history) => {
        commit('SET_HISTORY', history.reverse())
      })
  },
  logMessage({ commit }, message) {
    commit('ADD_LOG', message)
    return Promise.resolve()
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
