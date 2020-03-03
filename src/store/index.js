import Vue from 'vue'
import Vuex from 'vuex'

import {api, events} from '@/api'

import error from '@/store/error'
import groups from '@/store/groups'
import profile from '@/store/profile'
import network from '@/store/network'
import devices from '@/store/devices'
import system from '@/store/system'
import backup from '@/store/backup'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    system: system({api, events}),
    groups: groups({api, events}),
    profile: profile({api, events}),
    network: network({api, events}),
    devices: devices({api, events}),
    backup: backup({api, events}),
    error: error({api, events})
  },
  state: {
    ready: false,
    showUserModal: false
  },
  mutations: {
    ready(state) {
      state.ready = true
    },
    showUserModal(state, show) {
      state.showUserModal = show
    }
  },
  actions: {
    async init({dispatch, commit}) {
      dispatch('devices/subscribe')
      dispatch('groups/subscribe')

      await dispatch('system/fetch')
      await dispatch('profile/fetch')

      commit('ready')
    },
    showUserModal({commit}) {
      commit('showUserModal', true)
    },
    hideUserModal({commit}) {
      commit('showUserModal', false)
    }
  }
})
