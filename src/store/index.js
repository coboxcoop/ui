import Vue from 'vue'
import Vuex from 'vuex'
import faker from 'faker'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ready: false,
    profile: null,
    spaces: [],
    devices: [],
    groups: [],
    connections: {},
    showProfileModal: false
  },
  mutations: {
    ready(state) {
      state.ready = true
    },
    receiveProfile(state, profile) {
      state.profile = profile
    },
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
    // addPeerToGroup(state, {id, peerKey}) {
    //   let groupMembers = {...state.groupMembers}
    //   groupMembers = groupMembers.map(member => {
    //     if(member.peerKey === peerKey) {
    //       groupMembers.push({
    //         id: groupMembers.length,
    //         name: faker.fake('{{name.firstName}}'),
    //         peerKey
    //       })
    //     }
    //     return member
    //   })
    //   state.groupMembers = groupMembers
    // },
    receiveGroups(state, groups) {
      state.groups = groups
    }
  },
  getters: {
    onboardingComplete(state) {
      return state.profile && state.profile.name
    },
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
    },
    keyColor(state) {
      return key => {
        const nums = [
          key.slice(0, 5),
          key.slice(5, 11),
          key.slice(11, 16)
        ].map(hex => parseInt(`0x${hex}`))

        const h = nums[0] % 360
        const s = `${70 + (nums[1] % 30)}%`
        const l = `${30 + (nums[2] % 50)}%`
        return `hsl(${h}, ${s}, ${l})`
      }
    },
    myKeyColor(state, getters) {
      const key = state.profile && state.profile.publicKey
      if(key) return getters['keyColor'](key)
    }
  },
  actions: {
    async init({dispatch, commit}) {
      dispatch('connectWebsocket')
      await dispatch('fetchProfile')
      commit('ready')
      /*
      // this is where we would fetch "me", my name, my parentKey
      await dispatch('fetchGroups')
      await dispatch('connectAllGroups')
      */
    },
    connectWebsocket({commit}) {
      const ws = new WebSocket(`ws://localhost:3000/api`)
      ws.onmessage = e => console.info('ws', e)
      ws.onerror = err => console.error('ws', err)
      ws.onclose = () => console.warn('ws', 'closed')
    },
    async fetchProfile({commit}) {
      const {data} = await api.get('/profile')
      commit('receiveProfile', data)
    },
    async updateName({commit, dispatch}, name) {
      const {data} = await api.patch('/profile', {name})
      commit('receiveProfile', data)
    },
    createInitialGroup({dispatch}, name) {
      const groupName = `${name}'s Group`
      dispatch('createGroup', groupName)
    },
    async createGroup({dispatch, commit, state}, name) {
      const {data} = await api.post('/groups', {name})
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
    // how do we add a peer to a group
    addPeerToGroup({commit}, {id, peerKey}) {
      // commit('addPeerToGroup', {id, peerKey})
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
