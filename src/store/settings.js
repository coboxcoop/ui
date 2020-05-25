const LOCALSTORAGE_KEY = 'cobox_settings'

const defaultSettings = {
  dark: true
}

const retrieveState = () => {
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
  }
})