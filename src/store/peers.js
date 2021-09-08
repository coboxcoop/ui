export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: {
      // [peerId]: {
      //   lastSeenAt: timestamp,
      //   online: boolean
      // },
      // [peerId]: {
      //   lastSeenAt: timestamp,
      //   online: boolean
      // },
      // ...
    }
  },
  actions: {
    async subscribe ({commit}) {
      events.on('peer/connection', payload => {
        // TODO: we need to add this individual data point
        // to the state object in much the same way as we
        // do when we fetch...
      })
    },
    async fetch ({commit}) {
      try {
        const {data} = await api.get('/peers')
        // returns:
        // [{
        //   peerId: string,
        //   lastSeenAt: timestamp,
        //   online: boolean
        // }, ... ]
        commit('receiveData', data)
      } catch (err) {
        console.error(err)
      }
    }
  },
  mutations: {
    receiveData (state, data) {
      for (const peer in data) {
        state.data[peer.peerId] = peer
      }
    }
  },
  getters: {
    // TODO: create a getter to accesss
    // a peer object by the peer's public key
    byPublicKey (state) {
      // ...
    }
  }
})
