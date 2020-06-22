import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import filters from './filters'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

Vue.config.productionTip = false

Bugsnag.start({
  apiKey: '2beb08d6620bd27dc040fe44a08c78f2',
  plugins: [new BugsnagPluginVue()]
})

Bugsnag.getPlugin('vue')
  .installVueErrorHandler(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
