const LOGS_FETCH_INTERVAL = 10 * 1000 // 10s
import Bugsnag, {bugsnagEnabled} from '@/bugsnag'

export default ({api, events}) => ({
  namespaced: true,
  state: {
    offline: false,
    info: null,
    logs: null
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
    async fetchLogs({dispatch, commit}) {
      if(bugsnagEnabled) {
        let {data} = await api.get('/system/logs')
        commit('receiveLogs', data)
        Bugsnag.addMetadata('server_logs', {value: data})
        setTimeout(() => dispatch('fetchLogs'), LOGS_FETCH_INTERVAL)
      }
    },
    reportBug({state, rootState}, description) {
      Bugsnag.notify(new Error('Bug report'), event => {
        event.addMetadata('email', {value: rootState.settings.email})
        event.addMetadata('server_logs', {value: state.logs})
        event.addMetadata('description', {value: description})
      })
    }
  },
  mutations: {
    receive(state, data) {
      state.info = data
    },
    receiveLogs(state, data) {
      state.logs = data
    },
    offline(state) {
      state.offline = true
    }
  }
})
