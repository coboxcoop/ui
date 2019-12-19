import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    space: {},
  },
  mutations: {
    updateName(state, name) {
      state.name = name
    },
    createSpace(state, key) {
    //initialise an empty space within the global space 
    //in the next page we'll then assign properties
      state.space[key] = key
    }
  },
  getters: {
    hasBeenWelcomed(state) {
      return !!state.name
    },
    startedMakingASpace(state) {
      return !!state.space
    }
  },
  actions: {
    submitName({commit}, name) {
      //submit name to server
      commit('updateName', name)
    },
    startCreateSpace({commit}) {
      //start creation process to the server?
      commit('createSpace')
    }
  },
  modules: {
  }
})
