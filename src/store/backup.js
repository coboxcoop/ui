export default ({api, events}) => ({
  namespaced: true,
  actions: {
    async export({commit}, dir) {
      const {data} = await api.get('/export')
      return data
    },
    async import({commit}, dir) {
      const {data} = await api.post('/import')
      return data
    }
  }
})
