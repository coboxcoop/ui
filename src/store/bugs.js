import axios from 'axios'

export default ({api, events}) => ({
  namespaced: true,
  state: {},
  actions: {
    async submit({rootState: {system}}) {
      const bugsUrl = process.env.VUE_APP_BUGS_URL

      let fd = new FormData()

      fd.append('stacktrace', 'stack trace here')
 
      if(system.info) fd.append('server_version', system.info.version)
      fd.append('server_status', system.info ? 'online' : 'offline')
      fd.append('ui_version', process.env.VUE_APP_VERSION)

      const {data} = await axios.post(bugsUrl, fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if(data.bugId) {
        window.open(`${bugsUrl}/${data.bugId}`)
      } else {
        console.warn('Bug report could not be created')
      }
    }
  },
  mutations: {}
})