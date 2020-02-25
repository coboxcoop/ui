import Vue from 'vue'
import Vuex from 'vuex'

import {api, ws} from '@/api'

import error from '@/store/error'
import groups from '@/store/groups'
import profile from '@/store/profile'
import network from '@/store/network'
import devices from '@/store/devices'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    groups: groups(api),
    profile: profile(api),
    network: network(api),
    devices: devices(api),
    error
  },
  state: {
    ready: false
  },
  mutations: {
    ready(state) {
      state.ready = true
    },
  },
  actions: {
    async init({dispatch, commit}) {
      await dispatch('profile/fetch')
      commit('ready')
    }
  }
})
