export default api => ({
  namespaced: true,
  state: {
    offline: false,
    info: null
  },
  actions: {
    async fetch({commit}) {
      try {
        const {data} = await api.get('/system')
        commit('receive', data)
      } catch(e) {
        commit('offline')
      }
    }
  },
  mutations: {
    receive(state, data) {
      state.info = data
    },
    offline(state) {
      state.offline = true
    }
  }
})

    