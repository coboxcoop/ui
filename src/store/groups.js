export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: [],
    connections: {},
    mounts: {},
    stat: {}
  },
  actions: {
    async subscribe() {
      events.on('event', event => {
        console.warn(event)
      })
    },
    async fetch({commit, dispatch}) {
      const {data} = await api.get('/groups')
      commit('receiveData', data)

      data.forEach(async ({address}) => {
        const {data} = await api.get(`/groups/${address}/drive/stat`)
        commit('receiveStat', {address, stat: data})
      })
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
    },
    async mount({commit}, {address, name}) {
      try {
        await api.post(`/groups/${address}/mounts`, {address, name})
        commit('mounted', {address, mounted: true})
      } catch(e) {
        throw(e)
      }
    },
    async unmount({commit}, {address, name}) {
      try {
        await api.delete(`/groups/${address}/mounts`, {address, name})
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
  }
})
