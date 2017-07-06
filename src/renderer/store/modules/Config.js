const state = {
  context: null,
  namespace: 'chat'
}

const mutations = {
  SET_CONTEXT(state, context) {
    state.context = context
  }
}

const actions = {
  setContext({ commit }, context) {
    commit('SET_CONTEXT', context)
  }
}

export default {
  state,
  mutations,
  actions
}
