import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: null,
    spaces: []
  },
  mutations: {
    addMyName(state, name) {
      state.me = {name}
    },
    addPeerToSpace(state, {id, peerKey}) {
      let spaces = [...state.spaces]
      spaces = spaces.map(space => {
        if(space.id === id) {
          space.members.push({
            id: space.members.length,
            name: 'fake',
            peerKey
          })
        }
        return space
      })
      state.spaces = spaces
    }
  },
  getters: {
  },
  actions: {
    addMyName({commit}, name) {
      commit('addMyName', name)
    },
    addPeerToSpace({commit}, {id, peerKey}) {
      commit('addPeerToSpace', {id, peerKey})
    }
  },
  modules: {
  }
})
