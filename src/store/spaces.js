import _ from 'lodash'

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
      const {data} = await api.get('/spaces')
      commit('receiveData', data)
    },
    async getAllStats({state, dispatch}) {
      await Promise.all(state.data.map(({address}) => {
        return dispatch('getStat', {address})
      }))
    },
    async getStat({commit}, {address}) {
      const {data} = await api.get(`/spaces/${address}/drive/stat`)
      commit('receiveStat', {address, stat: data})
    },
    async getAllMounts({state, dispatch}) {
      await Promise.all(state.data.map(({address}) => {
        return dispatch('getMounts', {address})
      }))
    },
    async getMounts({commit}, {address}) {
      const {data} = await api.get(`/spaces/mounts`)
      commit('mounted', {address, mounted: data})
    },
    async getAllPeers({state, dispatch}) {
      await Promise.all(state.data.map(({address, name}) => {
        return dispatch('getPeers', address)
      }))
    },
    async getPeers({commit, dispatch}, address) {
      const {data} = await api.get(`/spaces/${address}/peers`)
      commit('receivePeers', {address, peers: data})
    },
    async create({dispatch}, name) {
      const {data, data: {address}} = await api.post('/spaces', {name})
      dispatch('join', {address, name})
      await dispatch('fetch')
      return data
    },
    async delete({}, {address}) {
      const {data} = await api.delete(`/spaces/${address}`)
      await dispatch('fetch')
      return data
    },
    async acceptInvite({dispatch}, code) {
      const {data} = await api.get('/spaces/invites/accept', {params: {code}})
      await dispatch('fetch')
    },
    async createInvite({}, {address, publicKey}) {
      const {data} = await api.post(`/spaces/${address}/invites`, {address, publicKey})
      return data
    },
    async joinAll({state, dispatch}) {
      await Promise.all(state.data.map(({address, name}) => {
        return dispatch('join', {address, name})
      }))
    },
    async join({dispatch, commit}, {address, name}) {
      // FIXME
      // When joining the swarm for each space, an error is thrown if we have already joined.
      // Since there is no way to fetch the joined status for space, we will ignore the error
      // if it matches some known condition and assume we have already joined that space swarm
      try {
        await api.post(`/spaces/${address}/connections`, {address, name})
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
    async leave({commit, dispatch}, {address, name}) {
      // FIXME
      // As with spaces/join -- we need a way to check if the server has already joined the swarm
      // before joining or leaving
      try {
        await api.delete(`/spaces/${address}/connections`, {address, name})
        commit('connected', {address, connected: false})
        await dispatch('unmount', {address, name})
      } catch(e) {
        throw(e)
      }
    },
    async mount({commit}, {address, name}) {
      try {
        await api.post(`/spaces/${address}/mounts`, {address, name})
        commit('mounted', {address, mounted: true})
      } catch(e) {
        throw(e)
      }
    },
    async unmount({commit}, {address, name}) {
      try {
        await api.delete(`/spaces/${address}/mounts`, {address, name})
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
    spaces(state) {
      return state.data
    },
    index(state) {
      return state.data.length
    },
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
    },
    peerCount(state, getters) {
      return address => {
        const peers = getters['peers'](address)
        return peers ? peers.length : 0
      }
    },
    allPeerCount(state, getters) {
      const counts = state.data.map(g => {
        return getters['peerCount'](g.address)
      })

      return counts.reduce((sum, num) => num + sum, 0)
    },
    allPeers(state, getters) {
      const peers = state.peers
      // FIXME:
      // unique() would allow you to pass something in
      // have a look at API
      // function uniq (array) {
      // if (!Array.isArray(array)) array = [array]
      // return Array.from(new Set(array))
      // }
      // @cobox/repository/util.js
      const spaces = getters['spaces']
      console.log(`spaces: ${ typeof spaces}`)
      spaces.forEach(space => {
        const spacePeers = getters['peers'](address)
        console.log(`spacePeers: ${spacePeers}`)

        if(Array.isArray(spacePeers)) spacePeers.forEach(peer => {
          console.log(`peer.data.author ${peer.data.author}`)
          const address = peer.data.author
          let spacePeer = peers[address] || peer

          spacePeer.spaces = spacePeer.spaces || []
          if(!spacePeer.spaces.find(({address}) => space.address == address)) spacePeer.spaces.push(space)

          peers[address] = spacePeer
        })
      })

      return peers
    }
  }
})
