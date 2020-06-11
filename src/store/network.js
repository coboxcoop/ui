import uniq from 'lodash/uniq'

export default ({api, events}) => ({
  namespaced: true,
  state: {
    peers: {},
    spaces: {
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
      const seeders = rootGetters['seeders/count']
      const spaces = rootGetters['spaces/count']
      const peers = rootGetters['spaces/allPeerCount']

      return seeders + spaces + peers
      // return uniq(
      //   Object.values(state.spaces).flatMap(g => g.members)
      //     .concat(Object.keys(state.spaces).map(gid => parseInt(gid)))
      // ).length
    }
  }
})
