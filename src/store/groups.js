export default api => ({
  namespaced: true,
  state: {
    data: []
  },
  actions: {
    async fetch({commit}) {
      const {data} = await api.get('/groups')
      commit('receiveData', data)
    },
    async create({dispatch}, name) {
      await api.post('/groups', {name})
      await dispatch('fetch')
    }
  },
  mutations: {
    receiveData(state, data) {
      console.warn('got data', data)
      state.data = data
    }
  }
})