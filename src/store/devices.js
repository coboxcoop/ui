export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: [],
    localDevices: {},
    connections: {},
    broadcasts: {},
    hidden: {}
  },
  actions: {
    // FIXME
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
    // FIXME
    // here exploring grabbing state from events to figure out peers within a group
    // this is a WIP and not used atm
    async peerAbout({commit}) {
      events.on('ADMIN_DEVICE', payload => {
        const peer = payload.data
        console.log(peer)
      })
    },
    async fetch({commit, dispatch}) {
      const {data} = await api.get('/admin/devices')
      commit('receiveData', data)
    },
    async joinAll({state, dispatch}) {
      await Promise.all(state.data.map(({address, name}) => {
        return dispatch('join', {address, name})
      }))
    },
    async join({commit}, {address, name}) {
      // FIXME
      // When joining the swarm for each group, an error is thrown if we have already joined.
      // Since there is no way to fetch the joined status for group, we will ignore the error
      // if it matches some known condition and assume we have already joined that group swarm
      try {
        await api.post(`/admin/devices/${address}/connections`, {address, name})
        commit('connected', {address, connected: true})
      } catch(e) {
        const msg = e.response.data && e.response.data.errors && e.response.data.errors[0].msg
        if(msg && msg.match('open connection')) {
          commit('connected', {address, connected: true})
        } else {
          throw(e)
        }
      }
    },
    async leave({commit}, {address, name}) {
      // FIXME
      // As with groups/join -- we need a way to check if the server has already joined the swarm
      // before joining or leaving
      try {
        await api.delete(`/admin/devices/${address}/connections`, {address, name})
        commit('connected', {address, connected: false})
      } catch(e) {
        throw(e)
      }
    },
    // FIXME
    // https://ledger-git.dyne.org/CoBox/cobox-server/issues/53
    // 3) When the user wants to create a device, send author field as
    // publicKey in parameters. You should still provide a device name
    // so your params look like { name, publicKey }.
    async setup({dispatch, state}, name) {
      const publicKey = Object.keys(state.localDevices)[0]
      const {data} = await api.post('/admin/devices', {name, publicKey})
      console.warn(data)
    },
    //# create the admin device using the public key you received under 'author' field, 
    //using nested parameters 'commands' to tell the device to hide (stop broadcasting).
    //curl http://localhost:1234/api/admin/devices -X POST -H "Content-Type: application/json" 
    //-d '{"name": "cobox", "publicKey": "insert-device-public-key-here", "commands": [{ "action": "hide" }] }'
    async hide({commit, dispatch, state}, name) {
      const publicKey = Object.keys(state.localDevices)[0]
      const commands = [{"action": "hide"}]
      const {data} = await api.post('/admin/devices/cobox/commands/hide', {name, publicKey, commands})
      commit('broadcast', {address, broadcast: false} )
      console.warn(data)
    },
    async announce({commit, dispatch, state}, name) {
      const publicKey = Object.keys(state.localDevices)[0]
      const commands = [{"action": "announce"}]
      const {data} = await api.post('/admin/devices/cobox/commands/announce', {name, publicKey, commands})
      commit('broadcast', {address, broadcast: true} )
      console.warn(data)
    },
    async acceptInvite({dispatch}, code) {
      const {data} = await api.get('/admin/devices/invites/accept', {params: {code}})
      await dispatch('fetch')
    },
    async createInvite({}, {address, publicKey}) {
      const {data} = await api.post(`/admin/devices/${address}/invites`, {address, publicKey})
      return data
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
    },
    connected(state, {address, connected}) {
      state.connections = {
        ...state.connections,
        [address]: connected
      }
    },
    broadcast(state, {address, broadcast}) {
      state.broadcasts = {
        ...state.broadcasts,
        [address]: broadcast
      }
    },
    hidden(state, {address, hidden}) {
      state.hidden = {
        ...state.hidden,
        [address]: hidden
      }
    }
  },
  getters: {
    count(state) {
      return state.data.length
    },
    single(state) {
      return address => {
        return state.data.find(d => d.address === address)
      }
    },
    connected(state) {
      return address => {
        return (address in state.connections) && state.connections[address]
      }
    },
    broadcast(state) {
      return address => {
        return (address in state.broadcasts) && state.broadcasts[address]
    },
    hidden(state) {
      return address => {
        return (address in state.hidden) && state.hidden[address]
      }
    }
  }
})
