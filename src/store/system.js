const LOGS_LOCALSTORAGE_KEY = 'cobox_logs'
const LOGS_FETCH_INTERVAL = 5 * 1000 // 5s

export default ({api, events}) => ({
  namespaced: true,
  state: {
    offline: false,
    info: null,
  },
  actions: {
    async fetch({commit}) {
      try {
        const {data} = await api.get('/system')
        commit('receive', data)
      } catch(e) {
        commit('offline')
      }
    },
    async fetchLogs({dispatch}) {
      try {
        let {data} = await api.get('/system/logs')
        if(data) window.localStorage.setItem(LOGS_LOCALSTORAGE_KEY, data)
        setTimeout(() => {
          dispatch('fetchLogs')
        }, LOGS_FETCH_INTERVAL)
      } catch(e) {}
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

    