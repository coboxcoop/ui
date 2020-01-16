import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spaces: [{
      id: 0,
      name: 'public office',
      members: [{
        id: 0,
        name: 'dan'
      }, {
        id: 1,
        name: 'matt'
      },{
        id: 2,
        name: 'paul'
      }]
    }, {
      id: 1,
      name: 'magma collective',
      members: [{
        id: 0,
        name: 'daniel'
      }, {
        id: 1,
        name: 'jaya'
      }, {
        id: 2,
        name: 'mu'
      }]
    }]
  },
  mutations: {
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
    addPeerToSpace({commit}, {id, peerKey}) {
      commit('addPeerToSpace', {id, peerKey})
    }
  },
  modules: {
  }
})
