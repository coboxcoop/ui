export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: [],
    // these have come from system.js, looking at how they do websocket
    // start here
    devices: {},
    offline: false,
    info: null
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
      await dispatch('broadcastReceiver')
      await dispatch('connect', address)
    },
    async broadcastReceiver({commit}) {
      //here i am wanting to listen on WS for UDP broadcast from cobox-hub
      //want to print to screen what the thing is
      try {
        const {data} = await api.get('/devices')
        console.warn(data)
        commit('receive', data)
      } catch(e) {
        commit('offline')
      }
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
    },
    receiveDevice(state, address) {
      state.devices = {
        ...state.devices,
        [address]: address
      }
    },
    offline(state) {
      state.offline = true
    }
  },
  getters: {
    count(state) {
      return state.data.length
    }
  }
})
