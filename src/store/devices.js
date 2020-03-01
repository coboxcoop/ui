export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: [],
    devices: {}
  },
  actions: {
    // https://ledger-git.dyne.org/CoBox/cobox-server/issues/53
    // 2) Save the author, the type and the timestamp in your store.
    // When its disconnected, make the device disappear, or delete it
    // entirely from your store?
    async subscribe() {
      events.on('deviceEvent', event => {
        const data = JSON.parse(event.data)
        console.warn(data)
      })
    },
    async fetch({commit, dispatch}) {
      const {data} = await api.get('/admin/devices')
      commit('receiveData', data)
      await dispatch('subscribe')
    },
    // https://ledger-git.dyne.org/CoBox/cobox-server/issues/53
    // 3) When the user wants to create a device, send author field as
    // publicKey in parameters. You should still provide a device name
    // so your params look like { name, publicKey }.
    async setup({dispatch}, name) {
      const {devices: {publicKey}} = await api.post('/admin/devices', {name})
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
