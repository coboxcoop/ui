export default api => ({
  namespaced: true,
  state: {
    data: [],
    connections: {}
  },
  actions: {
    async fetch({commit}) {
      const {data} = await api.get('/groups')
      commit('receiveData', data)
    },
    async create({dispatch}, name) {
      const {data: {address}} = await api.post('/groups', {name})
      dispatch('join', {address, name})
      await dispatch('fetch')
    },
    async acceptInvite({dispatch}, code) {
      const {data} = await api.get('/groups/invites/accept', {params: {code}})
      await dispatch('fetch')
    },
    async createInvite({}, {address, publicKey}) {
      const {data} = await api.post(`/groups/${address}/invites`, {address, publicKey})
      return data
    },
    async join({commit}, {address, name}) {
      try {
        await api.post(`/groups/${address}/connections`, {address, name})
        commit('connected', {address, connected: true})
      } catch(e) {
        throw(e)
      }
    },
    async leave({commit}, {address, name}) {
      try {
        await api.delete(`/groups/${address}/connections`, {address, name})
        commit('connected', {address, connected: false})
      } catch(e) {
        throw(e)
      }
    }
  },
  mutations: {
    receiveData(state, data) {
      state.data = data
    },
    connected(state, {address, connected}) {
      state.connections = {
        ...state.connections,
        [address]: connected
      }
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
    },
    connected(state) {
      return address => {
        return (address in state.connections) && state.connections[address]
      }
    },
    mounted(state) {
      return address => {
        return false
      }
    }
  }
})