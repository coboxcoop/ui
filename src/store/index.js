import Vue from 'vue'
import Vuex from 'vuex'

import {api, events} from '@/api'

import error from '@/store/error'
import groups from '@/store/groups'
import profile from '@/store/profile'
import network from '@/store/network'
import devices from '@/store/devices'
import system from '@/store/system'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    system: system(api),
    groups: groups({api, events}),
    profile: profile({api, events}),
    network: network(api),
    devices: devices({api, events}),
    error
  },
  state: {
    ready: false,
  },
  mutations: {
    ready(state) {
      state.ready = true
    }
  },
  actions: {
    async init({dispatch, commit}) {
      await dispatch('system/fetch')
      await dispatch('profile/fetch')
      commit('ready')
    }
  }
})
