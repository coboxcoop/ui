import Vue from "vue"

export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: [],
    connections: {},
    mounts: {},
    stat: {},
    peers: {},
    seederPeers: {}
  },
  actions: {
    async subscribe ({commit, dispatch}) {
      events.on('space/last-sync', payload => {
        commit('updateLastSync', payload)
      })
      events.on('peer/about', payload => {
        commit('updatePeers', {
          address: payload.address,
          peer: payload.data
        })
        // see note below by 'updatePeers' mutation
        // for why peersLastSync is called here
        dispatch('peersLastSync', payload.address)
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
    async create ({commit, dispatch}, name) {
      const {data, data: {address}} = await api.post('/spaces', {name})
      await dispatch('join', {address, name})
      commit('receiveSpace', data)
      await dispatch('getPeers', address)
      await dispatch('getStat', {address})
      await dispatch('peersLastSync', address)
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
    // NB. the seederPeers object is provided with the peer's name & peerId here, as when a peer first joins
    // a space, space/last-sync msgs fire through the websocket before a peer/about message has been
    // received. It is therefore not possible to store the seeder's info & name yet. As peer/about msgs are
    // relatively rare, they can be used to update the seederPeers object, and then last-sync data manually
    // fetched through an api call to ensure all the health-view data is populated. This trade-off allows
    // users to view full data on the space health view without needing to first do some manual action
    // (such as adding files to the space) that triggers more space/last-sync msgs to arrive. There
    // may well be a better way to do this that doesn't require an extra api call , but currently, without
    // doing that, there will be no 'last-sync' timestamp available until related user-actions take place.
    updatePeers (state, {address, peer}) {
      state.peers[address] = {
        ...(state.peers[address] || {}),
        [peer.author]: peer
      }
      state.seederPeers[address] = {
        ...(state.seederPeers[address] || {}),
        [peer.author]: {
          name: peer.content.name,
          peerId: peer.author
        }
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
      const spacePeers = state.peers[address]
      if (data) {
        for (const el in data) {
          let seeder = data[el]
          let namedPeer = spacePeers[seeder.peerId] || {}
          if (namedPeer) {
            seeder = {
              ...seeder,
              name: namedPeer.content.name
            }
            data[el] = seeder
          }
        }
      }
      state.seederPeers = {
        ...state.seederPeers,
        [address]: data
      }
    },
    updateLastSync (state, payload) {
      const spacePeers = state.peers[payload.address]
      if (spacePeers[payload.data.peerId]) {
        state.seederPeers[payload.address] = {
          ...(state.seederPeers[payload.address] || {}),
          [payload.data.peerId]: {
            ...payload.data,
            name: spacePeers[payload.data.peerId].content.name
          }
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
