export default api => ({
  namespaced: true,
  state: {
    data: []
  },
  actions: {
    async fetch({commit}) {
      const {data} = await api.get('/admin/devices')
      commit('receiveData', data)
    },
    async setup({dispatch}, name) {
      const {data: {address}} = await api.post('/admin/devices', {name})
      dispatch('join', {address, name})
      await dispatch('fetch')
    },
    async join({dispatch}, deviceInviteKey) {
      const [address, encryptionKey, name] = deviceInviteKey.split(':')
      await api.post('/admin/devices', {name, encryptionKey, address})
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
