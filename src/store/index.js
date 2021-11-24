import Vue from 'vue'
import Vuex from 'vuex'

import {api, events} from '@/api'

import backup from '@/store/backup'
import error from '@/store/error'
import profile from '@/store/profile'
import seeders from '@/store/seeders'
import peers from '@/store/peers'
import settings from '@/store/settings'
import spaces from '@/store/spaces'
import system from '@/store/system'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings: settings({api, events}),
    system: system({api, events}),
    spaces: spaces({api, events}),
    profile: profile({api, events}),
    peers: peers({api, events}),
    seeders: seeders({api, events}),
    backup: backup({api, events}),
    error: error({api, events})
  },
  state: {
    poll: false,
    pollInterval: 3000,
    ready: false
  },
  mutations: {
    ready (state) {
      state.ready = true
    }
  },
  actions: {
    async init ({dispatch, commit}) {
      dispatch('system/fetchLogs')
      await dispatch('system/fetch')
      await dispatch('profile/fetch')
      commit('ready')
    },
    async initData ({dispatch}) {
      await dispatch('spaces/joinAll')
      await dispatch('seeders/joinAll')
    },
    async fetchAllData ({dispatch, state}) {
      await dispatch('peers/fetch')

      await dispatch('spaces/fetch')
      await dispatch('spaces/getAllPeers')
      await dispatch('spaces/getAllStats')
      await dispatch('spaces/getAllMounts')
      await dispatch('spaces/getLastSync')

      await dispatch('seeders/fetch')
      await dispatch('seeders/getAllPeers')
      await dispatch('seeders/getAllReplicates')

      await dispatch('peers/subscribe')
      await dispatch('spaces/subscribe')

      if (this.state.poll) {
        setTimeout(() => dispatch('fetchAllData'), state.pollInterval)
      }
    }
  }
})
