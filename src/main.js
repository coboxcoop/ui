import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueShortkey from 'vue-shortkey'
import './filters'
import './bugsnag'

Vue.config.productionTip = false

Vue.use(VueShortkey)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
