import Vue from 'vue'
import Vuex from 'vuex'

import kube from './tools/kube'
import helm from './tools/helm'

Vue.use(Vuex)

const state = {
  context: { name: null },
  contexts: [],
  namespace: { name: null },
  namespaces: [],
  release: { name: null },
  releases: [],
  history: [],
  config: {
    kubePath: '/usr/local/bin/',
    helmPath: '/usr/local/bin/'
  },
  logs: [],
  isLoading: false
}

const mutations = {
  SET_CONTEXT(state, context) {
    state.context = context
    state.namespace.name = null
    state.namespaces = []
    state.release.name = null
    state.releases = []
    state.history = []
  },
  SET_CONTEXTS(state, contexts) {
    state.contexts = contexts
  },
  SET_NAMESPACE(state, namespace) {
    state.namespace = namespace
    state.release.name = null
    state.releases = []
    state.history = []
  },
  SET_NAMESPACES(state, namespaces) {
    state.namespaces = namespaces
  },
  SET_RELEASE(state, release) {
    state.release = release
    state.history = []
  },
  RESET_RELEASE(state, release) {
    state.release.name = null
    state.history = []
  },
  MERGE_RELEASE_WITH_HISTORY(state) {
    state.release.revision = state.history[0].revision
    state.release.status = state.history[0].status
    state.release.updated = state.history[0].updated
  },
  SET_RELEASES(state, releases) {
    state.releases = releases
  },
  SET_HISTORY(state, history) {
    state.history = history
  },
  SET_CONFIG(state, config) {
    state.config = config
  },
  ADD_LOG(state, log) {
    state.logs.push(log)
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading
  }
}

const actions = {
  applyContext({ commit }, context) {
    commit('SET_CONTEXT', context)
    return Promise.resolve()
  },
  loadContexts({ commit }) {
    return kube.getContexts()
      .then((contexts) => {
        commit('SET_CONTEXTS', contexts)

        const context = contexts.find((context) => context.current === '*')
        commit('SET_CONTEXT', context)
      })
  },
  applyNamespace({ commit }, namespace) {
    commit('SET_NAMESPACE', namespace)
    return Promise.resolve()
  },
  loadNamespaces({ commit }) {
    return kube.getNamespaces()
      .then((namespaces) => {
        commit('SET_NAMESPACES', namespaces)

        const namespace = namespaces[0]
        commit('SET_NAMESPACE', namespace)
      })
  },
  applyRelease({ commit }, release) {
    commit('SET_RELEASE', release)
    return Promise.resolve()
  },
  syncReleaseWithHistory({ commit }) {
    commit('MERGE_RELEASE_WITH_HISTORY')
    return Promise.resolve()
  },
  loadReleases({ commit }) {
    return helm.getReleases()
      .then((releases) => {
        commit('SET_RELEASES', releases)
        commit('RESET_RELEASE')
      })
  },
  loadHistory({ commit }) {
    return helm.getHistory()
      .then((history) => {
        commit('SET_HISTORY', history.reverse())
      })
  },
  applyConfig({ commit }, config) {
    commit('SET_CONFIG', config)
    return Promise.resolve()
  },
  addLog({ commit }, log) {
    commit('ADD_LOG', log)
    return Promise.resolve()
  },
  initLoading({ commit }) {
    commit('SET_LOADING', true)
    return Promise.resolve()
  },
  finishLoading({ commit }) {
    commit('SET_LOADING', false)
    return Promise.resolve()
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
