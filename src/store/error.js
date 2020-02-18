export default {
  namespaced: true,
  state: {
    message: 'An error has ocurred'
  },
  actions: {
    handle({commit}, e) {
      commit('receiveMessage', e.message)
    },
    dismiss({commit}) {
      commit('dismiss')
    }
  },
  mutations: {
    receiveMessage(state, message) {
      state.message = message
    },
    dismiss(state) {
      state.message = null
    }
  }
}