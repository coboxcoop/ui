const LOGS_FETCH_INTERVAL = 10 * 1000 // 10s
import Bugsnag, {bugsnagEnabled} from '@/bugsnag'
import Bowser from 'bowser'

export default ({api, events}) => ({
  namespaced: true,
  state: {
    offline: false,
    info: null,
    logs: null,
    os: 'Linux'
  },
  getters: {
    logsPath(state) {
      if(state.os === 'Linux') return '~/.config/cobox/1/logs'
      if(state.os === 'macOs') return '~/Application Support/Cobox/1/logs'
      if(state.os === 'Windows') return ''
    }
  },
  actions: {
    async fetch({commit, dispatch}) {
      try {
        const {data} = await api.get('/system')
        commit('receive', data)
      } catch (e) {
        commit('offline')
      }

      dispatch('setBaseDir')
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
    },
    setBaseDir({commit}) {
      const bowser = Bowser.getParser(window.navigator.userAgent)
      const {name} = bowser.getOS()
      commit('os', name)
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
    },
    os(state, os) {
      state.os = os
    }
  }
})
