const LOCALSTORAGE_KEY = 'cobox_settings'

const defaultSettings = {
  dark: true,
  betaTester: true,
  email: '',
  shortkey: true,
  errorMessages: true,
  bugReportIcon: true
}

export const retrieveState = () => {
  let storedSettings
  try {
    storedSettings = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY))
  } catch(e) {
    storedSettings = {}
  }

  return {...defaultSettings, ...storedSettings}
}

export default ({api, events}) => ({
  namespaced: true,
  state: retrieveState(),
  actions: {
    update({commit, dispatch}, obj) {
      commit('update', obj)
      dispatch('persist')
    },
    toggleDark({state, dispatch}) {
      dispatch('update', {dark: !state.dark})
    },
    toggleShortkey({state, dispatch}) {
      dispatch('update', {shortkey: !state.shortkey})
    },
    toggleErrorMessages({state, dispatch}) {
      dispatch('update', {errorMessages: !state.errorMessages})
    },
    toggleBugReportIcon({state, dispatch}) {
      dispatch('update', {bugReportIcon: !state.bugReportIcon})
    },
    async toggleBetaTester({state, dispatch}) {
      await dispatch('update', {betaTester: !state.betaTester})
      // initialise a page reload to enable/disable bugsnag
      if(process.env.VUE_APP_BUGSNAG_API_KEY) window.location.reload()

    },
    persist({state}) {
      try {
        window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({...state}))
      } catch(e) {}
    }
  },
  mutations: {
    update(state, update) {
      Object.keys(update).forEach(key => {
        state[key] = update[key]
      })
    }
  },
  getters: {
    errorMessages(state) {
      return state.errorMessages
    }
  }
})
