export default ({api, events}) => ({
  namespaced: true,
  state: {},
  actions: {
    submit() {
      window.open(process.env.VUE_APP_BUGS_URL)
    }
  },
  mutations: {}
})