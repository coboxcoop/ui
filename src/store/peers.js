export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: {}
  },
  actions: {
    async subscribe ({commit}) {
      events.on('peer/connection', payload => {
        commit('updateData', payload)
      })
    },
    async fetch ({commit}) {
      try {
        const res = await api.get('/peers')
        commit('receiveData', res.data)
      } catch (err) {
        console.error(err)
      }
    }
  },
  mutations: {
    receiveData (state, data) {
      state.data = data
    },
    updateData (state, peer) {
      state.data[peer.key] = peer.value
    }
  },
  getters: {
    byPublicKey (state) {
      return publicKey => {
        return state.data[publicKey]
      }
    }
  }
})
