import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import Vue from 'vue'

if(process.env.VUE_APP_BUGSNAG_API_KEY) {
  Bugsnag.start({
    apiKey: process.env.VUE_APP_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginVue()]
  })

  Bugsnag.getPlugin('vue')
    .installVueErrorHandler(Vue)
  }
}