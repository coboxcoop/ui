export default (api) => ({
  namespaced: true,
  actions: {
    async exportKeys({commit}, dir) {
      await api.put('/keys/export', {dir})
    }
  }
})