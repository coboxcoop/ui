const SYSTEM_FETCH_INTERVAL = 5000

export default ({api, events}) => ({
  namespaced: true,
  state: {
    offline: false,
    info: null
  },
  actions: {
    init({dispatch}) {
      dispatch('fetch')
      setInterval(() => dispatch('fetch'), SYSTEM_FETCH_INTERVAL)
    },
    async fetch({state, commit}) {
      try {
        const {data} = await api.get('/system')
        commit('receive', data)
        
        // If the server was offline but is now back, reload the app
        if(state.offline) window.location.reload()
      } catch(e) {
        commit('offline')
      }
    }
  },
  mutations: {
    receive(state, data) {
      state.info = data
    },
    offline(state) {
      state.offline = true
    }
  }
})

    