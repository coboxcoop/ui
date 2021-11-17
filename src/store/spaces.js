import Vue from "vue"

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
    async subscribe ({commit, dispatch}) {
      events.on('space/last-sync', payload => {
        commit('updateLastSync', payload)
      })
      // events.on('peer/about', payload => {
      //   commit('addPeerToSpace', {
      //     address: payload.address,
      //     peer: payload.data
      //   })
      // })
    },
    async fetch ({commit}) {
      try {
        const {data} = await api.get('/spaces')
        commit('receiveData', data)
      } catch (err) {
        console.error(err)
      }
    },
    async getAllStats ({state, dispatch}) {
      await Promise.all(state.data.map(({address}) => {
        return dispatch('getStat', {address})
      }))
    },
    async getStat ({commit}, {address}) {
      const {data} = await api.get(`/spaces/${address}/drive/stat`)
      commit('receiveStat', {address, stat: data})
    },
    async getAllMounts ({state, dispatch}) {
      await Promise.all(state.data.map(({address}) => {
        return dispatch('getMounts', {address})
      }))
    },
    async getMounts ({commit}, {address}) {
      const {data} = await api.get(`/spaces/mounts`)
      commit('mounted', {address, mounted: data})
    },
    async getAllPeers ({state, dispatch}) {
      await Promise.all(state.data.map(({address, name}) => {
        return dispatch('getPeers', address)
      }))
    },
    async getPeers ({commit, dispatch}, address) {
      const {data} = await api.get(`/spaces/${address}/peers`)
      commit('receivePeers', {address, peers: data})
    },
    async getLastSync ({state, dispatch}) {
      await Promise.all(state.data.map(({address}) => {
        return dispatch('peersLastSync', address)
      }))
    },
    async peersLastSync ({commit}, address) {
      const {data} = await api.get(`/spaces/${address}/last-sync`)
      commit('receiveLastSync', {address, data})
    },
    async changeSettings ({commit}, {address, threshold, tolerance}) {
      tolerance = tolerance * 86400000
      await api.patch(`/spaces/${address}/settings`, {threshold, tolerance})
      commit('updateSettings', {address, threshold, tolerance})
    },
    async create ({commit,dispatch}, name) {
      const {data, data: {address}} = await api.post('/spaces', {name})
      await dispatch('join', {address, name})
      commit('receiveSpace', data)
      await dispatch('getPeers', address)
      await dispatch('getStat', {address})
      return {address}
    },
    async delete ({dispatch}, {address}) {
      const {data} = await api.delete(`/spaces/${address}`)
      await dispatch('fetch')
      return data
    },
    async acceptInvite ({dispatch}, code) {
      const {data} = await api.get('/spaces/invites/accept', {params: {code}})
      await dispatch('fetch')
    },
    async createInvite ({}, {address, publicKey}) {
      const {data} = await api.post(`/spaces/${address}/invites`, {address, publicKey})
      return data
    },
    async joinAll ({state, dispatch}) {
      await Promise.all(state.data.map(({address, name}) => {
        return dispatch('join', {address, name})
      }))
    },
    async join ({dispatch, commit}, {address, name}) {
      // FIXME
      // When joining the swarm for each space, an error is thrown if we have already joined.
      // Since there is no way to fetch the joined status for space, we will ignore the error
      // if it matches some known condition and assume we have already joined that space swarm
      try {
        await api.post(`/spaces/${address}/connections`, {address, name})
        commit('connected', {address, connected: true})
      } catch (e) {
        const msg = e.response.data && e.response.data.errors && e.response.data.errors[0].msg
        if (msg && msg.match('open connection')) {
          commit('connected', {address, connected: true})
        } else {
          throw (e)
        }
      }
    },
    async leave ({commit, dispatch}, {address, name}) {
      // FIXME
      // As with spaces/join -- we need a way to check if the server has already joined the swarm
      // before joining or leaving
      try {
        await api.delete(`/spaces/${address}/connections`, {address, name})
        commit('connected', {address, connected: false})
        await dispatch('unmount', {address, name})
      } catch (e) {
        throw (e)
      }
    },
    async mount ({commit}, {address, name}) {
      try {
        await api.post(`/spaces/${address}/mounts`, {address, name})
        commit('mounted', {address, mounted: true})
      } catch (e) {
        throw (e)
      }
    },
    async unmount ({commit}, {address, name}) {
      try {
        await api.delete(`/spaces/${address}/mounts`, {address, name})
        commit('mounted', {address, mounted: false})
      } catch (e) {
        throw (e)
      }
    }
  },
  mutations: {
    receiveData (state, data) {
      state.data = data
    },
    receiveSpace (state, space) {
      state.data.push(space)
    },
    receiveStat (state, {address, stat}) {
      state.stat = {
        ...state.stat,
        [address]: stat
      }
    },
    addPeerToSpace (state, {address, peer}) {
      state.peers[address].push(peer)
    },
    receivePeers (state, {address, peers}) {
      state.peers = {
        ...state.peers,
        [address]: peers
      }
    },
    connected (state, {address, connected}) {
      state.connections = {
        ...state.connections,
        [address]: connected
      }
    },
    mounted (state, {address, mounted}) {
      state.mounts = {
        ...state.mounts,
        [address]: mounted
      }
    },
    receiveLastSync (state, {address, data}) {
      for (const el of state.peers[address]) {
        data.forEach((peer) => {
          if (peer.peerId === el.data.author) {
            el.data = Object.assign({}, el.data, {
              lastSyncAt: peer.lastSyncAt
            })
            let index = data.indexOf(peer)
            delete data[index]
          }
        })
      }
    },
    updateLastSync (state, payload) {
      for (const el of state.peers[payload.address]) {
        if (payload.data.peerId === el.data.author) {
          Vue.set(el.data, 'lastSyncAt', payload.data.lastSyncAt)
        }
      }
    },
    updateSettings (state, {address, threshold, tolerance}) {
      for (let el of state.data) {
        if (el.address === address) {
          Vue.set(el, 'threshold', threshold)
          Vue.set(el, 'tolerance', tolerance)
        }
      }
    }
  },
  getters: {
    index (state) {
      return state.data.length
    },
    count (state) {
      return state.data.length
    },
    single (state) {
      return address => {
        return state.data.find(g => g.address === address)
      }
    },
    connected (state) {
      return address => {
        return (address in state.connections) && state.connections[address]
      }
    },
    stat (state) {
      return address => {
        return (address in state.stat) && state.stat[address]
      }
    },
    mounted (state) {
      return address => {
        return (address in state.mounts) && state.mounts[address]
      }
    },
    peers (state) {
      return address => {
        return (address in state.peers) && state.peers[address]
      }
    },
    peerCount (state, getters, rootState, rootGetters) {
      return address => {
        let peers = getters['peers'](address)
        const me = rootGetters['profile/myPublicKey']
        if (peers) {
          peers = peers.filter(peer => peer.data.author !== me)
          return peers.length
        } else return 0
      }
    },
    lastSyncAt (state) {
      return address => {
        return (address in state.lastSyncAt) && state.lastSyncAt[address]
      }
    },
    allPeerCount (state, getters) {
      const counts = state.data.map(g => {
        return getters['peerCount'](g.address)
      })

      return counts.reduce((sum, num) => num + sum, 0)
    },
    seederCount (state, getters) {
      return address => {
        // TODO: we need a count of the space's seeders here!
        return 0
      }
    },
    settings (state) {
      return address => {
        const space = state.data.find(g => g.address === address)
        let values = {
          threshold: space.threshold,
          tolerance: space.tolerance / 86400000
        }
        return values
      }
    }
  }
})
