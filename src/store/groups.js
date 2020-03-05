export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: [],
    connections: {},
    mounts: {},
    stat: {},
    peers: {}
  },
  actions: {
    async subscribe() {
      events.on('peer/connection', event => {
        console.warn('event sub', event)
      })
    },
    async fetch({commit, dispatch}) {
      const {data} = await api.get('/groups')
      commit('receiveData', data)
    },
    async getAllStats({state, dispatch}) {
      await Promise.all(state.data.map(({address}) => {
        return dispatch('getStat', {address})
      }))
    },
    async getStat({dispatch}, {address}) {
      const {data} = await api.get(`/groups/${address}/drive/stat`)
      console.warn('STATTT', data)
    },
    async getAllPeers({state, dispatch}) {
      await Promise.all(state.data.map(({address, name}) => {
        return dispatch('getPeers', address)
      }))
    },
    async getPeers({commit, dispatch}, address) {
      const {data} = await api.get(`/groups/${address}/peers`)
      commit('receivePeers', {address, peers: data})
    },
    async create({dispatch}, name) {
      const {data, data: {address}} = await api.post('/groups', {name})
      dispatch('join', {address, name})
      await dispatch('fetch')
      return data
    },
    async acceptInvite({dispatch}, code) {
      const {data} = await api.get('/groups/invites/accept', {params: {code}})
      await dispatch('fetch')
    },
    async createInvite({}, {address, publicKey}) {
      const {data} = await api.post(`/groups/${address}/invites`, {address, publicKey})
      return data
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
        await api.post(`/groups/${address}/connections`, {address, name})
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
        await api.delete(`/groups/${address}/connections`, {address, name})
        commit('connected', {address, connected: false})
      } catch(e) {
        throw(e)
      }
    },
    async mount({commit}, {address, name}) {
      try {
        await api.post(`/groups/${address}/mounts`, {address, name})
        commit('mounted', {address, mounted: true})
      } catch(e) {
        throw(e)
      }
    },
    async unmount({commit}, {address, name}) {
      try {
        await api.delete(`/groups/${address}/mounts`, {address, name})
        commit('mounted', {address, mounted: false})
      } catch(e) {
        throw(e)
      }
    }
  },
  mutations: {
    receiveData(state, data) {
      state.data = data
    },
    receiveStat(state, {address, stat}) {
      state.stat = {
        ...state.stat,
        [address]: stat
      }
    },
    receivePeers(state, {address, peers}) {
      state.peers = {
        ...state.peers,
        [address]: peers
      }
    },
    connected(state, {address, connected}) {
      state.connections = {
        ...state.connections,
        [address]: connected
      }
    },
    mounted(state, {address, mounted}) {
      state.mounts = {
        ...state.mounts,
        [address]: mounted
      }
    }
  },
  getters: {
    count(state) {
      return state.data.length
    },
    single(state) {
      return address => {
        return state.data.find(g => g.address === address)
      }
    },
    connected(state) {
      return address => {
        return (address in state.connections) && state.connections[address]
      }
    },
    stat(state) {
      return address => {
        return (address in state.stat) && state.stat[address]
      }
    },
    mounted(state) {
      return address => {
        return (address in state.mounts) && state.mounts[address]
      }
    },
    peers(state) {
      return address => {
        return (address in state.peers) && state.peers[address]
      }
    }
  }
})
