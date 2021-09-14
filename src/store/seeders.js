import _ from 'lodash'

export default ({api, events}) => ({
  namespaced: true,
  state: {
    seeders: [],
    connections: {},
    broadcasts: {},
    peers: {},
    replicates: {}
  },
  actions: {
    async fetch({commit, dispatch}) {
      const {data} = await api.get('/admin/seeders')
      commit('receiveSeeders', data)
    },
    async joinAll({state, dispatch}) {
      await Promise.all(state.seeders.map(({address, name}) => {
        return dispatch('join', {address, name})
      }))
    },
    async getAllPeers({state, dispatch}) {
      await Promise.all(state.seeders.map(({address, name}) => {
        return dispatch('getPeers', address)
      }))
    },
    async getAllReplicates({state, dispatch}) {
      await Promise.all(state.seeders.map(({address, name}) => {
        return dispatch('getReplicates', address)
      }))
    },
    async join({commit}, {address, name}) {
      // FIXME
      // When joining the swarm for each space, an error is thrown if we have already joined.
      // Since there is no way to fetch the joined status for space, we will ignore the error
      // if it matches some known condition and assume we have already joined that space swarm
      try {
        await api.post(`/admin/seeders/${address}/connections`, {address, name})
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
      // As with spaces/join -- we need a way to check if the server has already joined the swarm
      // before joining or leaving
      try {
        await api.delete(`/admin/seeders/${address}/connections`, {address, name})
        commit('connected', {address, connected: false})
      } catch(e) {
        throw(e)
      }
    },
    async acceptInvite({dispatch}, code) {
      const {data: {address, name}} = await api.get('/admin/seeders/invites/accept', {params: {code}})
      await dispatch('fetch')
      await dispatch('getPeers', address)
      await dispatch('getReplicates', address)
      await dispatch('join', {address, name})
    },
    async createInvite({}, {address, publicKey}) {
      const {data} = await api.post(`/admin/seeders/${address}/invites`, {address, publicKey})
      return data
    },
    async getPeers({commit, dispatch}, address) {
      const {data} = await api.get(`/admin/seeders/${address}/peers`)
      commit('receivePeers', {address, peers: data})
    },
    async replicate({dispatch, state}, {address, name, seeder}){
      const {data} = await api.post(`/admin/seeders/${seeder}/commands/replicate`, {name, address})
      dispatch('getReplicates', seeder)
    },
    async unreplicate({dispatch, state}, {address, name, seeder}){
      const {data} = await api.post(`/admin/seeders/${seeder}/commands/unreplicate`, {name, address})
      dispatch('getReplicates', seeder)
    },
    async getReplicates({commit, dispatch}, address) {
      const {data} = await api.get(`/admin/seeders/${address}/commands/replicates`)
      commit('receiveReplicates', {address, replicates: data})
    }
  },
  mutations: {
    receiveSeeders(state, seeders) {
      state.seeders = seeders
    },
    receivePeers(state, {address, peers}) {
      state.peers = {
        ...state.peers,
        [address]: peers
      }
    },
    receiveReplicates(state, {address, replicates}) {
      state.replicates = {
        ...state.replicates,
        [address]: replicates
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
    }
  },
  getters: {
    count(state) {
      return state.seeders.length
    },
    single(state) {
      return address => {
        return state.seeders.find(d => d.address === address)
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
      }
    },
    peers(state) {
      return address => {
        return (address in state.peers) && state.peers[address]
      }
    },
    peerCount(state, getters) {
      return address => {
        return  getters['peers'](address).length
      }
    },
    replicates(state) {
      return address => {
        const entries = (address in state.replicates) && state.replicates[address]

        const replicates = entries

        const grouped = _.map(_.values(
          _.groupBy(replicates, r => {
            return r.value.content.address
          })
        ), space => _.last(_.sortBy(space, 'timestamp')))

        return grouped
      }
    },
    replicateAuthor(state, getters) {
      return (seeder, replicate) => {
        const publicKey = replicate.value.author
        const peers = getters['peers'](seeder)

        return peers.find(peer => peer.data.author === publicKey)
      }
    }
  }
})
