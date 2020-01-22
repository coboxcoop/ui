import Vue from 'vue'
import Vuex from 'vuex'
import faker from 'faker'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: null,
    spaces: [],
    devices: [],
    groups: []
  },
  mutations: {
    addMyName(state, name) {
      state.me = {name}
    },
    addDevice(state, device) {
      state.devices = [...state.devices, device]
    },
    addPeerToDevice(state, {id, peerKey}) {
      let devices = [...state.devices]
      devices = devices.map(device => {
        if(device.id === id) {
          device.members.push({
            id: device.members.length,
            name: faker.fake('{{name.firstName}}'),
            peerKey
          })
        }
        return device
      })
      state.devices = devices
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
    },
    receiveGroups(state, groups) {
      state.groups = groups
    }
  },
  getters: {
  },
  actions: {
    addMyName({commit, dispatch}, name) {
      commit('addMyName', name)
      dispatch('createInitialSpace', name)
      dispatch('fetchGroups')
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
    joinSpace({commit, state}, spaceKeyToJoin) {
      const space  = {
        id: state.spaces.length,
        name: faker.fake('{{name.lastName}} SPACE'),
        members: []
      }
      commit('addSpace', space)
    },
    addPeerToSpace({commit}, {id, peerKey}) {
      commit('addPeerToSpace', {id, peerKey})
    },
    createDevice({commit, state}, name) {
      const device  = {
        id: state.devices.length,
        name,
        members: []
      }
      commit('addDevice', device)
    },
    addPeerToDevice({commit}, {id, peerKey}) {
      commit('addPeerToDevice', {id, peerKey})
    },
    async fetchGroups({commit}) {
      const {data} = await api.get('/groups')
      commit('receiveGroups', data)
    },
  }
})
