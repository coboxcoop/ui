export default ({api, events}) => ({
  namespaced: true,
  actions: {
    async export ({commit}, dir) {
      const {data} = await api.get('/export')
      return data
    },
    async import ({}, file) {
      const data = new FormData()
      data.append('export', file)
      await api.post('/import', data, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })

      window.location = '/'
    }
  }
})
