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
      const {data: {address}} = await api.post('/groups', {name})
      api.post(`/groups/${address}/connections`, {name, address})
      await dispatch('fetch')
    },
    async join({dispatch}, groupInviteKey) {
      const [address, encryptionKey, name] = groupInviteKey.split(':')
      await api.post('/groups', {name, encryptionKey, address})
      api.post(`/groups/${address}/connections`, {name, address})
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