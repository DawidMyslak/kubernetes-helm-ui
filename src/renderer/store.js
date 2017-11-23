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
  deployments: [],
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
    state.deployments = []
    state.history = []
  },
  SET_CONTEXTS(state, contexts) {
    state.contexts = contexts
  },
  SET_NAMESPACE(state, namespace) {
    state.namespace = namespace
    state.release.name = null
    state.releases = []
    state.deployments = []
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
  SET_DEPLOYMENTS(state, deployments) {
    state.deployments = deployments
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
  loadReleasesAndDeployments({ commit }) {
    return helm.getReleases()
      .then((releases) => {
        commit('SET_RELEASES', releases)
        commit('RESET_RELEASE')
        return kube.getDeployments()
      })
      .then((deployments) => {
        commit('SET_DEPLOYMENTS', deployments)
      })
  },
  loadHistory({ commit }) {
    return helm.getHistory()
      .then((history) => {
        commit('SET_HISTORY', history.reverse())
      })
  },
  applyConfig({ commit }, config) {
    window.localStorage.setItem('config', JSON.stringify(config))
    commit('SET_CONFIG', config)
    return Promise.resolve()
  },
  loadConfig({ commit }) {
    const config = JSON.parse(window.localStorage.getItem('config'))
    if (config) {
      commit('SET_CONFIG', config)
    }
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

const getters = {
  getReleases(state) {
    return state.releases.map((release) => {
      let deployment = null
      let github = null

      deployment = state.deployments.find((deployment) => {
        const selector = deployment.selector.split(',')
          .map((item) => item.split('='))
          .reduce((accumulator, item) => {
            accumulator[item[0]] = item[1]
            return accumulator
          }, {}) || {}

        if (selector.release) {
          return release.name === selector.release
        }

        return release.name === selector.app
      })

      if (deployment) {
        const image = deployment.image.split(':')
        if (image.length === 2 && image[0].includes('/')) {
          github = {
            repository: image[0],
            shortCommit: image[1].slice(0, 7),
            commit: image[1]
          }
        }
      }

      return { ...release, deployment, github }
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
