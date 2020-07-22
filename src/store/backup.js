export default ({api, events}) => ({
  namespaced: true,
  actions: {
    async export({commit}, dir) {
      const {data} = await api.put('/export')
      return data
    },
    async import({commit}, dir) {
      const {data} = await api.put('/import')
      return data
    }
  }
})
