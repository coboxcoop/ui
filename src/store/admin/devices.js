export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: []
  },
  actions: {
    async subscribe() {
      events.on('event', event => {
        console.warn(event)
      })
    },
    async fetch({commit, dispatch}) {
      const {data} = await api.get('/admin/devices')
      commit('receiveData', data)
    },
    async setup({dispatch}, name) {
      const {data: {address}} = await api.post('/admin/devices', {name})
      // dispatch('join', {address, name})
      await dispatch('fetch')
      await dispatch('connect', address)
    },
    async join({dispatch}, deviceInviteKey) {
      const [address, encryptionKey, name] = deviceInviteKey.split(':')
      await api.post('/admin/devices', {name, encryptionKey, address})
      await dispatch('fetch')
    },
    async connect({}, address) {
      const {data} = await api.post(`/admin/devices${address}/connections`, {address})
      console.warn(data)
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
