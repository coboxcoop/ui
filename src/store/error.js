export default ({api, events}) => ({
  namespaced: true,
  state: {
    message: null
  },
  actions: {
    handle({commit, rootGetters}, e) {
      if(rootGetters['settings/errorMessages']) {
        if(e.response && e.response.data) {
          if('errors' in e.response.data) {
            const message = e.response.data.errors.map(error => {
              return error.msg
            }).join(', ')
            return commit('receiveMessage', message)
          }
        }
        commit('receiveMessage', e.message)
      }
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
})
