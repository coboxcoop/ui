export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: [],
    localDevices: {}
  },
  actions: {
    // https://ledger-git.dyne.org/CoBox/cobox-server/issues/53
    // 2) Save the author, the type and the timestamp in your store.
    // When its disconnected, make the device disappear, or delete it
    // entirely from your store?
    async subscribe({commit}) {
      events.on('DEVICE_CONNECTED', payload => {
        const device = payload.data
        console.warn(device)
        commit('receiveDevice', device)
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
    }
  },
  mutations: {
    receiveData(state, data) {
      state.data = data
    },
    receiveDevice(state, device) {
      state.localDevices = {
        ...state.localDevices,
        [device.author]: device
      }
    }
  },
  getters: {
    count(state) {
      return state.data.length
    }
  }
})
