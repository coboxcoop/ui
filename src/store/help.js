export default ({api, events}) => ({
  namespaced: true,
  state: {},
  actions: {
    submitErrorReport() {
      window.open(process.env.VUE_APP_HELP_URL)
    }
  },
  mutations: {}
})