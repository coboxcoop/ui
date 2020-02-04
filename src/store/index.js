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
    groups: [],
    connections: {}
  },
  mutations: {
    updateConnectionStatus(state, {address, connected}) {
      if(connected) {
        state.connections = {
          ...state.connections,
          [address]: true
        }
      } else {
        let connections = {...state.connections}
        Vue.delete(connections, address)
        state.connections = connections
      }
    },
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
    addGroup(state, group) {
      state.groups = [...state.groups, group]
    },
    addPeerToGroup(state, {id, peerKey}) {
      let groups = [...state.groups]
      groups = groups.map(group => {
        if(group.id === id) {
          group.members.push({
            id: group.members.length,
            name: faker.fake('{{name.firstName}}'),
            peerKey
          })
        }
        return group
      })
      state.groups = groups
    },
    receiveGroups(state, groups) {
      state.groups = groups
    }
  },
  getters: {
    getNameOfGroup(state) {
      return address => {
        const group = state.groups.find(group => group.address === address)
        if(group) return group.name
      }
    },
    groupStatusColor(state, getters) {
      return address => {
        let color = 'lightgrey'
        if(getters['groupConnected'](address)) {
          color = 'green'
        } else {
          color = 'orange'
        }
        return color
      }
    },
    groupConnected(state) {
      return address => {
        return address in state.connections
      }
    },
    groupMembers(state) {
      return address => {
        return [state.me]
      }
    }
  },
  actions: {
    async init({dispatch, commit}) {
      // this is where we would fetch "me", my name, my parentKey
      await dispatch('fetchGroups')
      await dispatch('connectAllGroups')
      // this is a stub, when the above is done, then this will become an api call/check
      commit('addMyName', 'dan')
    },
    addMyName({commit, dispatch}, name) {
      commit('addMyName', name)
      dispatch('createInitialGroup', name)
    },
    createInitialGroup({dispatch}, name) {
      const groupName = `${name}'s Group`
      dispatch('createGroup', groupName)
    },
    async createGroup({dispatch, commit, state}, name) {
      const{data} = await api.post('/groups', {name})
      dispatch('fetchGroups')
    },
    async joinGroup({dispatch, commit, state}, groupAddressToJoin) {
      // Joining a group is `cobox groups join -n 'the-chicken-coop' -A 'HASH'`
      // 97a56bd0a0803fbc58c24e92f5850d49a08d327217f523a55018991289870955:6b82626c75b2ed0c9ed1d3b220e8bc48fb572bdd7b189169fb425990c3d94398:Dan
      // Join = find, or create, with an address and an encryption key (necessary), then create an open connection
      // joining is not a particular end-point but a series of end points. atm thats find or create, then swarm, it could also be mount too.
      const [address, encryptionKey, name] = groupAddressToJoin.split(':')
      let res
      res = await api.get('/groups')
      const foundGroup = res.data.find(group => group.address === address)
      if(foundGroup) return alert('Hello this group has already been joined')
      res = await api.post('/groups', {name, encryptionKey, address})
      console.warn(res.data)
      dispatch('fetchGroups')
    },
    createGroup({commit, state}, name) {
      const group  = {
        id: state.groups.length,
        name,
        members: []
      }
      commit('addGroup', group)
    },
    joinGroup({commit, state}, groupKeyToJoin) {
      const group  = {
        id: state.groups.length,
        name: faker.fake('{{name.lastName}} GROUP'),
        members: []
      }
      commit('addGroup', group)
    },
    addPeerToGroup({commit}, {id, peerKey}) {
      commit('addPeerToGroup', {id, peerKey})
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
    async connectAllGroups({dispatch, state}) {
      return await Promise.all(state.groups.map(group => {
        return dispatch('connectGroup', group.address)
      }))
    },
    async connectGroup({commit, getters}, address) {
      const name = getters['getNameOfGroup'](address)
      let res 
      try {
        res = await api.post(`/groups/${address}/connections`, {address, name})
        // we're ignoring the error when we try and connect twice (to an already open connection)
      } catch(e) { }
      commit('updateConnectionStatus', {address, connected: true})
    },
    async disconnectGroup({commit, getters}, address) {
      const name = getters['getNameOfGroup'](address)
      let res 
      try {
        res = await api.delete(`/groups/${address}/connections`, {address, name})
        // we're ignoring the error when we try and connect twice (to an already open connection)
      } catch(e) { }
      commit('updateConnectionStatus', {address, connected: false})
    },
    async toggleGroupConnection({dispatch, getters}, address) {
      if(getters['groupConnected'](address)) {
        dispatch('disconnectGroup', address)
      } else {
        dispatch('connectGroup', address)
      }
    }
  }
})
