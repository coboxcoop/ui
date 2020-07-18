export default ({api, events}) => ({
  namespaced: true,
  state: {
    message: null
  },
  actions: {
    handle({commit, getters}, e) {
    //FIXME: this.$store is not defined
      if(this.$store.getters['settings/errorMessages']) {
        if(e.response && e.response.data) {
          if('errors' in e.response.data) {
            const message = e.response.data.errors.map(error => {
              return error.msg
            }).join(', ')
            return commit('receiveMessage', message)
          }
        }
        //FIXME: this might be within the wrong {} since attempting to implement errorMessages logic
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
