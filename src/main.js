import Vue          from 'vue'
import VueShortkey  from 'vue-shortkey'
import vSelect      from 'vue-select'
import App          from './App.vue'
import router       from './router'
import store        from './store'
import './filters'
import './bugsnag'

Vue.config.productionTip = false

Vue.use(VueShortkey)
Vue.component('v-select', vSelect)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
