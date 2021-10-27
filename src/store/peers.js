export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: {
      // peerId: {
      //   peerId: string,
      //   lastSeenAt: timestamp,
      //   online: boolean
      // }
    }
  },
  actions: {
    async subscribe ({commit}) {
      events.on('peer/connection', payload => {
        commit('updatePeerLastSeen', payload)
      })
    },
    async fetch ({commit}) {
      try {
        // returns an array of objects
        const {data} = await api.get('/peers')
        commit('storePeerLastSeen', data)
      } catch (err) {
        console.error(err)
      }
    }
  },
  mutations: {
    storePeerLastSeen (state, data) {
      for (let peer of data) {
        state.data[peer.peerId] = {
          peerId: peer.peerId,
          lastSeenAt: peer.lastSeenAt,
          online: peer.online
        }
      }
    },
    updatePeerLastSeen (state, payload) {
      state.data[payload.value.peerId] = {
        peerId: payload.value.peerId,
        lastSeenAt: payload.value.lastSeenAt,
        online: payload.value.online
      }
    }
  },
  getters: {
    // accesss a peer object by the peer's public key
    byPublicKey (state, {peerId}) {
      return peerId => {
        return (peerId in state.data) && state.data[peerId]
      }
    }
  }
})
