const LOGS_FETCH_INTERVAL = 10 * 1000 // 10s
import Bugsnag, {bugsnagEnabled} from '@/bugsnag'

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
      if(bugsnagEnabled) {
        let {data} = await api.get('/system/logs')
        Bugsnag.addMetadata('server_logs', data)
        setTimeout(() => dispatch('fetchLogs'), LOGS_FETCH_INTERVAL)
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
