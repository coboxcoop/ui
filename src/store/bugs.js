import axios from 'axios'

export default ({api, events}) => ({
  namespaced: true,
  state: {},
  actions: {
    async submit() {
      const bugsUrl = process.env.VUE_APP_BUGS_URL

      let formData = new FormData()
      formData.append('description', 'Some data from the CoBox app, a stacktrace, versions etc')

      const {data} = await axios.post(bugsUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if(data.bugId) {
        window.open(`${bugsUrl}/${data.bugId}`)
      }
    }
  },
  mutations: {}
})