export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: [],
    devices: {}
  },
  actions: {
    async subscribe() {
      events.on('deviceEvent', event => {
        console.warn(event)
      })
    },
    async fetch({commit, dispatch}) {
      const {data} = await api.get('/admin/devices')
      commit('receiveData', data)
    },
    // https://ledger-git.dyne.org/CoBox/cobox-server/issues/53
    // 3) When the user wants to create a device, send author field as
    // publicKey in parameters. You should still provide a device name
    // so your params look like { name, publicKey }.
    async setup({dispatch}, name) {
      const {devices: {publicKey}} = await api.post('/admin/devices', {name})
      await dispatch('fetch')
    },
    async broadcastReceiver({commit}) {
      //here i am wanting to listen on WS for UDP broadcast from cobox-hub
      //want to print to screen what the thing is
      try {
        const {data} = await api.get('/devices')
        console.warn(data)
        commit('receive', data)
      } catch(e) {
        // this has been borrowed from network.js
        // haven't implemented offline mutation as am not sure this is
        // the right strategy
        commit('offline')
      }
    },
    // async join({dispatch}, deviceInviteKey) {
    //   const [address, encryptionKey, name] = deviceInviteKey.split(':')
    //   await api.post('/admin/devices', {name, encryptionKey, address})
    //   await dispatch('fetch')
    // },
    async connect({}, address) {
      const {data} = await api.post(`/admin/devices${address}/connections`, {address})
      console.warn(data)
    }
  },
  mutations: {
    receiveData(state, data) {
      state.data = data
    },
    //https://ledger-git.dyne.org/CoBox/cobox-server/issues/53
    //2) Save the author, the type and the timestamp in your store.
    //When its disconnected, make the device disappear, or delete it
    //entirely from your store?
    receiveDevice(state, address) {
      state.devices = {
        ...state.devices,
        [address]: address
      }
    }
  },
  getters: {
    count(state) {
      return state.data.length
    }
  }
})
