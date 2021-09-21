export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: null,
    alternates: []
  },
  actions: {
    async fetch({commit}) {
      const res = await api.get('/identities/current')
      commit('receiveData', res.data)
    },
    async updateName({commit, getters}, name = 'Anonymous') {
      const pubKey = getters.myPublicKey
      const {data} = await api.patch(`/identities/${pubKey}`, { name })
      commit('receiveData', data)
    },
    async switch({commit}, id) {
      const res = await api.put(`/session/${id}`)
      window.location.reload()
    }
  },
  mutations: {
    receiveData(state, data) {
      state.data = data
    },
    receiveAlternates(state, data) {
      state.alternates = data
    }
  },
  getters: {
    myName(state) {
      return state.data && state.data.name
    },
    myPublicKey(state) {
      return state.data && state.data.publicKey
    },
    hasName(state) {
      return !!(state.data && state.data.name)
    },
    keyColor() {
      return key => {
        const nums = [
          key.slice(0, 5),
          key.slice(5, 11),
          key.slice(11, 16)
        ].map(hex => parseInt(`0x${hex}`))

        const h = nums[0] % 360
        const s = `${70 + (nums[1] % 30)}%`
        const l = `${30 + (nums[2] % 50)}%`
        return `hsl(${h}, ${s}, ${l})`
      }
    },
    myKeyColor(state, getters) {
      const key = state.data && state.data.publicKey
      if(key) return getters['keyColor'](key)
    },
    me(state) {
      return state.data
    },
    alternates(state, getters) {
      return state.alternates.filter(({publicKey}) => publicKey !== getters.myPublicKey)
    }
  }
})
