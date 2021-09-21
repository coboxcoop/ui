import Vue from 'vue'
import Vuex from 'vuex'

import {
  api,
  events,
  openWS,
  closeWS
} from '@/api'

import backup from '@/store/backup'
import error from '@/store/error'
import profile from '@/store/profile'
import seeders from '@/store/seeders'
import peers from '@/store/peers'
import settings from '@/store/settings'
import spaces from '@/store/spaces'
import system from '@/store/system'
import auth from '@/store/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth({api, events, openWS, closeWS}),
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
    ready: false,
    loading: true
  },
  mutations: {
    loading(state) {
      state.loading = true
    },
    loaded(state) {
      setTimeout(() => {
        state.loading = false
      }, 750)
    },
    ready(state) {
      state.ready = true
    }
  },
  actions: {
    async init({dispatch, commit}) {
      commit('loading')
      try {
        await dispatch('system/fetch')
        commit('ready')
        await dispatch('auth/check')
        await dispatch('fetchAllData')
        await dispatch('initData')
        openWS()
      } catch (err) {
        console.error(err)
      } finally {
        commit('loaded')
      }
    },
    async initData({dispatch}) {
      await dispatch('spaces/joinAll')
      await dispatch('seeders/joinAll')
    },
    async fetchAllData({dispatch, state}) {
      // TODO: a better solution than to get all data on initial load
      // would be to fetch the relevant information as we hit the correct view,
      // using vuejs's mounted function
      //
      // for example, getAllPeers, getAllStats and getAllMounts are irrelevant
      // on the landing page, the data is only useful on the actual SpaceSingleView
      await dispatch('profile/fetch')
      await dispatch('system/fetchLogs')
      await dispatch('peers/fetch')
      await dispatch('spaces/fetch')
      await dispatch('spaces/getAllPeers')
      await dispatch('spaces/getAllStats')
      await dispatch('spaces/getAllMounts')
      await dispatch('spaces/getAllLastSync')
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
