import uniq from 'lodash/uniq'

export default ({api, events}) => ({
  namespaced: true,
  state: {
    peers: {},
    groups: {
      0: {
        members: [1, 2, 3, 4, 5, 6, 7]
      },
      4: {
        members: [8, 9, 10, 11, 12]
      },
      7: {
        members: [13, 14, 15, 23, 4]
      },
      16: {
        members: [7, 16, 17, 18, 19, 20, 21, 22, 23]
      }
    }
  },
  mutations: {
  },
  getters: {
    count(state, getters, rootState, rootGetters) {
      console.warn(rootGetters)
      const devices = rootGetters['devices/count']
      const groups = rootGetters['groups/count']
      const peers = rootGetters['groups/allPeerCount']

      return devices + groups + peers
      // return uniq(
      //   Object.values(state.groups).flatMap(g => g.members)
      //     .concat(Object.keys(state.groups).map(gid => parseInt(gid)))
      // ).length
    }
  }
})