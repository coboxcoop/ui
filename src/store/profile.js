export default ({api, events}) => ({
  namespaced: true,
  state: {
    data: null
  },
  actions: {
    async fetch({commit}) {
      const {data} = await api.get('/profile')
      commit('receiveData', data)
    },
    async updateName({commit}, name) {
      let n = name.trim()
      if(!n) n = 'Anonymous'
      const {data} = await api.patch('/profile', {name: n})
      commit('receiveData', data)
    }
  },
  mutations: {
    receiveData(state, data) {
      state.data = data
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
    }
  }
})
