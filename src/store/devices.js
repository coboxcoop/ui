export default api => ({
  namespaced: true,
  state: {
    data: []
  },
  actions: {
    async fetch({commit}) {
      const {data} = await api.get('/devices')
      commit('receiveData', data)
    },
    async create({dispatch}, name) {
      await api.post('/devices', {name})
      await dispatch('fetch')
    },
    async join({dispatch}, deviceInviteKey) {
      const [address, encryptionKey, name] = deviceInviteKey.split(':')
      await api.post('/devices', {name, encryptionKey, address})
      await dispatch('fetch')
    }
  },
  mutations: {
    receiveData(state, data) {
      state.data = data
    }
  },
  getters: {
    count(state) {
      return state.data.length
    }
  }
})
