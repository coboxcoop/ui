export default ({api, events}) => ({
  namespaced: true,
  actions: {
    async exportKeys({commit}, dir) {
      const {data} = await api.put('/keys/export')
      return data
    }
  }
})