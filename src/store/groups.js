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
    },
    async join({dispatch}, groupInviteKey) {
      const [address, encryptionKey, name] = groupInviteKey.split(':')
      await api.post('/groups', {name, encryptionKey, address})
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