const state = {
  items: []
}

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items
  }
}

const actions = {
  setReleases({ commit }, releases) {
    commit('SET_ITEMS', releases)
  }
}

export default {
  state,
  mutations,
  actions
}
