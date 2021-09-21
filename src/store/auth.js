import { mapActions } from 'vuex'

export default ({api, events, openWS, closeWS}) => ({
  namespaced: true,
  state: {
    locked: true
  },
  mutations: {
    unlock(state) {
      state.locked = false
    },
    lock(state) {
      state.locked = true
    }
  },
  actions: {
    async create({dispatch, commit}, password) {
      commit('loading', null, { root: true })
      try {
        await dispatch('register', password)
      } catch (err) {
        await dispatch('login', password)
        openWS()
      } finally {
        commit('loaded', null, { root: true })
      }
      await Promise.all([
        dispatch('fetchAllData', null, { root: true }),
        dispatch('initData', null, { root: true })
      ])
      commit('unlock')
    },
    async check({commit}) {
      try {
        await api.get('/auth')
        commit('unlock')
      } catch (e) {
        console.error(e)
      }
    },
    async register({commit}, password) {
      await api.post('/register', { password })
      commit('unlock')
    },
    async login({commit}, password) {
      await api.post('/auth', { password })
      commit('unlock')
    },
    async logout({commit}) {
      closeWS()
      await api.delete('/auth')
      commit('loading', null, { root: true })
      commit('lock')
      commit('loaded', null, { root: true })
    }
  }
})
