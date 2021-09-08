import Vue from 'vue'
import Vuex from 'vuex'

import {api, events} from '@/api'

import error from '@/store/error'
import spaces from '@/store/spaces'
import profile from '@/store/profile'
import seeders from '@/store/seeders'
import system from '@/store/system'
import backup from '@/store/backup'
import settings from '@/store/settings'
// TODO: we should import our peers store file

Vue.use(Vuex)

export default new Vuex.Store({
  // TODO: we should add our peers module so we can dispatch actions
  modules: {
    settings: settings({api, events}),
    system: system({api, events}),
    spaces: spaces({api, events}),
    profile: profile({api, events}),
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
      // TODO: spaces/subscribe doesn't actually do anything,
      // see store/spaces.js#actions#subscribe
      // so we can delete this, and the subscribe function too!
      dispatch('spaces/subscribe')
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
      await dispatch('spaces/fetch')
      await dispatch('spaces/getAllPeers')
      await dispatch('spaces/getAllStats')
      await dispatch('spaces/getAllMounts')
      await dispatch('seeders/fetch')
      await dispatch('seeders/getAllPeers')
      await dispatch('seeders/getAllReplicates')
      // TODO:
      // 1. we want to dispatch the peers fetch action here
      // 2. we want to dispatch the peers subscribe action too so we receive websocket updates

      if (this.state.poll) {
        setTimeout(() => dispatch('fetchAllData'), state.pollInterval)
      }
    }
  }
})
