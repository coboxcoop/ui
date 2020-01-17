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
    addSpace(state, space) {
      state.spaces = [...state.spaces, space]
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
    addMyName({commit, dispatch}, name) {
      commit('addMyName', name)
      dispatch('createInitialSpace', name)
    },
    createInitialSpace({commit}, name) {
      const initialSpace = {
        id: 0,
        name: `${name}'s Space`,
        members: []
      }
      commit('addSpace', initialSpace)
    },
    addPeerToSpace({commit}, {id, peerKey}) {
      commit('addPeerToSpace', {id, peerKey})
    }
  },
  modules: {
  }
})
