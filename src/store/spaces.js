import Vue from "vue"

export default ({api, events}) => ({
  namespaced: true,
  state: {
    // TODO: state storage could be dramatically simplified by just making data an object...
    // since none of these data points are used anywhere outside the space view, we always
    // have the spaceId, so we can always get/put the relevant data...
    data: [],
    connections: {
      // [spaceId]: bool
    },
    mounts: {
      // [spaceId]: bool
    },
    stat: {
      // [spaceId]: object
    },
    peers: {
      // [spaceId]: {
      //   [peerId]: {
      //     type: string
      //     author: string,
      //     content: { name: string }
      //   }
      // }
    },
    seederPeers: {
      // [spaceId]: {
      //    [peerId]: {
      //      lastSyncAt: timestamp
      //    }
      // }
    }
  },
  actions: {
    async subscribe ({commit, dispatch}) {
      events.on('space/last-sync', payload => {
        commit('updateLastSync', payload)
      })
      events.on('peer/about', payload => {
        commit('updatePeers', payload)
      })
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
    async getAllMounts({commit, dispatch}) {
      const {data} = await api.get(`/spaces/mounts`)
      commit('mounted', {mounted: data})
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
    async getAllLastSync ({state, dispatch}) {
      await Promise.all(state.data.map(({address}) => {
        return dispatch('getLastSync', address)
      }))
    },
    async getLastSync ({commit}, address) {
      const {data} = await api.get(`/spaces/${address}/last-sync`)
      commit('receiveLastSync', {address, data})
    },
    async update ({commit}, {address, params}) {
      const {data} = await api.patch(`/spaces/${address}`, params)
      commit('updateSettings', {address, data})
    },
    async create ({commit, dispatch}, name) {
      const {data, data: {address}} = await api.post('/spaces', {name})
      await dispatch('join', {address, name})
      commit('receiveSpace', data)
      await dispatch('getPeers', address)
      await dispatch('getStat', {address})
      await dispatch('getLastSync', address)
      return {address}
    },
    async delete ({dispatch}, {address}) {
      const {data} = await api.delete(`/spaces/${address}`)
      await dispatch('fetch')
      return data
    },
    async acceptInvite ({commit, dispatch}, code) {
      const {data, data: {address, name}} = await api.get('/spaces/invites/accept', {params: {code}})
      await dispatch('join', {address, name})
      commit('receiveSpace', data)
      await dispatch('getPeers', address)
      await dispatch('getStat', {address})
      return {address}
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
        const {data} = await api.post(`/spaces/${address}/mounts`, {address, name})
        commit('mounted', { mounted: { [address]: data.location } })
      } catch(e) {
        throw(e)
      }
    },
    async unmount ({commit}, {address, name}) {
      try {
        await api.delete(`/spaces/${address}/mounts`, {address, name})
        commit('mounted', { mounted: { [address]: null } })
      } catch(e) {
        throw(e)
      }
    }
  },
  mutations: {
    receiveData (state, data) {
      state.data = data
    },
    receiveSpace (state, space) {
      state.data.push(space)
      state.seederPeers[space.address] = {}
    },
    receiveStat (state, {address, stat}) {
      state.stat = {
        ...state.stat,
        [address]: stat
      }
    },
    receivePeers (state, {address, peers}) {
      state.peers = {
        ...state.peers,
        [address]: peers
      }
    },
    updatePeers (state, {address, data: peer}) {
      state.peers[address] = {
        ...(state.peers[address] || {}),
        [peer.author]: peer
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
        ...mounted
      }
    },
    receiveLastSync (state, {address, data}) {
      state.seederPeers = {
        ...state.seederPeers,
        [address]: data
      }
    },
    updateLastSync (state, payload) {
      // {
      //   address: string,
      //   data: {
      //     peerId: string
      //     lastSyncAt: timestamp
      //   }
      // }
      state.seederPeers[payload.address] = {
        ...(state.seederPeers[payload.address] || {}),
        [payload.data.peerId]: payload.data
      }
    },
    updateSettings (state, {address, data}) {
      for (let el of state.data) {
        if (el.address === address) {
          Vue.set(el, 'threshold', data.threshold)
          Vue.set(el, 'tolerance', data.tolerance)
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
        return (address in state.mounts) && Boolean(state.mounts[address])
      }
    },
    peers (state) {
      return address => {
        return state.peers[address] || {}
      }
    },
    seederPeers (state) {
      return address => {
        return (address in state.seederPeers) && state.seederPeers[address]
      }
    },
    peerCount (state, getters, rootState, rootGetters) {
      return address => {
        const peers = getters['peers'](address)
        const me = rootGetters['profile/myPublicKey']
        return Object.keys(peers).filter(peerId => peerId !== me).length
      }
    },
    allPeerCount (state, getters) {
      const counts = state.data.map(g => {
        return getters['peerCount'](g.address)
      })

      return counts.reduce((sum, num) => num + sum, 0)
    },
    seederPeerCount (state, getters, rootState, rootGetters) {
      return address => {
        const seederPeers = getters['seederPeers'](address)
        const me = rootGetters['profile/myPublicKey']
        if (seederPeers) {
          return Object.keys(seederPeers).filter(peerId => peerId !== me).length
        } else return 0
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
