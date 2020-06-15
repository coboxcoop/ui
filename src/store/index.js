import Vue from 'vue'
import Vuex from 'vuex'

import {api, events} from '@/api'

import error from '@/store/error'
import spaces from '@/store/spaces'
import profile from '@/store/profile'
import network from '@/store/network'
import seeders from '@/store/seeders'
import system from '@/store/system'
import backup from '@/store/backup'
import settings from '@/store/settings'
import help from '@/store/help'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings: settings({api, events}),
    system: system({api, events}),
    spaces: spaces({api, events}),
    profile: profile({api, events}),
    network: network({api, events}),
    seeders: seeders({api, events}),
    backup: backup({api, events}),
    error: error({api, events}),
    help: help({api, events})
  },
  state: {
    poll: true,
    pollInterval: 3000,
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
      dispatch('seeders/subscribe')
      dispatch('spaces/subscribe')

      await dispatch('system/fetch')
      await dispatch('profile/fetch')

      commit('ready')
    },
    async initData({dispatch}) {
      await dispatch('spaces/joinAll')
      await dispatch('seeders/joinAll')
    },
    async fetchAllData({dispatch, state}) {
      await dispatch('spaces/fetch')
      await dispatch('spaces/getAllPeers')
      await dispatch('spaces/getAllStats')
      await dispatch('seeders/fetch')
      await dispatch('seeders/getAllPeers')
      await dispatch('seeders/getAllReplicates')

      if(this.state.poll) setTimeout(() => dispatch('fetchAllData'), state.pollInterval)
    },
    showUserModal({commit}) {
      commit('showUserModal', true)
    },
    hideUserModal({commit}) {
      commit('showUserModal', false)
    }
  }
})
