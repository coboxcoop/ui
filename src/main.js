import Vue from 'vue'
import VueShortkey from 'vue-shortkey'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'
import './bugsnag'

Vue.config.productionTip = false

Vue.use(VueShortkey)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
