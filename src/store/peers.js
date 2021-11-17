import Vue from "vue"

export default ({api, events}) => ({
  namespaced: true,
  state: {
    peers: {}
  },
  actions: {
    async subscribe ({commit, dispatch}) {
      events.on('peer/connection', peer => {
        commit('updatePeer', peer)
      })
    },
    async fetch ({state, commit}) {
      // returns an array of objects
      const {data} = await api.get('/peers')
      commit('receivePeers', data)
    }
  },
  mutations: {
    receivePeers (state, peers) {
      state.peers = {
        ...state.peers,
        ...peers
      }
    },
    updatePeer (state, peer) {
      state.peers = {
        ...state.peers,
        [peer.peerId]: peer
      }
    }
  },
  getters: {
    byPublicKey (state) {
      return (peerId) => {
        return (peerId in state.peers) && state.peers[peerId]
      }
    }
  }
})
