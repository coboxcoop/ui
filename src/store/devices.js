export default ({api, events}) => ({
  namespaced: true,
  state: {
    devices: [],
    localDevices: {},
    connections: {},
    broadcasts: {},
    hidden: {},
    peers: {}
  },
  actions: {
    async subscribe({commit}) {
      events.on('DEVICE_CONNECTED', payload => {
        const device = payload.data
        console.warn(device)
        commit('receiveDevice', device)
      })

      events.on('ADMIN_DEVICE', payload => {
        const peer = payload.data
        console.log(peer)
      })
    },
    async fetch({commit, dispatch}) {
      const {data} = await api.get('/admin/devices')
      commit('receiveDevices', data)
    },
    async joinAll({state, dispatch}) {
      await Promise.all(state.devices.map(({address, name}) => {
        return dispatch('join', {address, name})
      }))
    },
    async getAllPeers({state, dispatch}) {
      await Promise.all(state.devices.map(({address, name}) => {
        return dispatch('getPeers', address)
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
    async setup({dispatch, state}, name) {
      const publicKey = Object.keys(state.localDevices)[0]
      const {data} = await api.post('/admin/devices', {name, publicKey})
      console.warn(data)
    },
    // FIXME
    // cobox is hardcoded in route and should be dynamic
    async hide({commit, dispatch, state}, {name, address}) {
      const publicKey = Object.keys(state.localDevices)[0]
      const {data} = await api.post('/admin/devices/cobox/commands/hide', {
        name,
        publicKey,
        commands: [{
          action: 'hide'
        }]
      })
      commit('broadcast', {address, broadcast: false} )
      console.warn(data)
    },
    // FIXME
    // cobox is hardcoded in route and should be dynamic
    async announce({commit, dispatch, state}, {name, address}) {
      const publicKey = Object.keys(state.localDevices)[0]
      const {data} = await api.post('/admin/devices/cobox/commands/announce', {
        name,
        publicKey,
        commands: [{
          action: 'announce'
        }]
      })
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
    },
    async getPeers({commit, dispatch}, address) {
      const {data} = await api.get(`/admin/devices/${address}/peers`)
      commit('receivePeers', {address, peers: data})
    },
    async replicate({dispatch, state}, {address, params}){
      const {data} = await api.post(`/admin/devices/${address}/commands/replicate`, params)
      console.warn(data)
     }
  },
  mutations: {
    receiveDevices(state, devices) {
      state.devices = devices
    },
    receivePeers(state, {address, peers}) {
      state.peers = {
        ...state.peers,
        [address]: peers
      }
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
      return state.devices.length
    },
    single(state) {
      return address => {
        return state.devices.find(d => d.address === address)
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
        return (address in state.broadcasts) && state.broadcasts[address]
      }
    },
    peers(state) {
      return address => {
        return (address in state.peers) && state.peers[address]
      }
    }
  }
})
