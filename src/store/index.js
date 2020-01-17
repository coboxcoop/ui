import Vue from 'vue'
import Vuex from 'vuex'
import faker from 'faker'

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
            name: faker.fake('{{name.firstName}}'),
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
    createInitialSpace({dispatch}, name) {
      const spaceName = `${name}'s Space`
      dispatch('createSpace', spaceName)
    },
    createSpace({commit, state}, name) {
      const space  = {
        id: state.spaces.length,
        name,
        members: []
      }
      commit('addSpace', space)
    },
    addPeerToSpace({commit}, {id, peerKey}) {
      commit('addPeerToSpace', {id, peerKey})
    }
  },
  modules: {
  }
})
