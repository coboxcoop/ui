import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: ''
  },
  mutations: {
    updateName(state, name) {
      state.name = name
    }
  },
  getters: {
    hasBeenWelcomed(state) {
      return !!state.name
    }
  },
  actions: {
    submitName({commit}, name) {
      //submit name to server
      commit('updateName', name)
    }
  },
  modules: {
  }
})
