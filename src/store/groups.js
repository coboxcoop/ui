export default api => ({
  namespaced: true,
  state: {
    data: []
  },
  actions: {
    async fetch({commit}) {
      const {data} = await api.get('/groups')
      commit('receiveData', data)
    },
    async create({dispatch}, name) {
      const {data: {address}} = await api.post('/groups', {name})
      api.post(`/groups/${address}/connections`, {name, address})
      await dispatch('fetch')
    },
    async acceptInvite({dispatch}, code) {
      const {data} = await api.get('/groups/invites/accept', {params: {code}})
      await dispatch('fetch')
    },
    async createInvite(_, {address, publicKey}) {
      const {data} = await api.post(`/groups/${address}/invites`, {address, publicKey})
      return data
    },
  },
  mutations: {
    receiveData(state, data) {
      state.data = data
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
    }
  }
})