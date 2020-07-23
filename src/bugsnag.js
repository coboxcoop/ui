import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import Vue from 'vue'
import {retrieveState} from '@/store/settings'

const settings = retrieveState()

export let bugsnagEnabled = false

if(settings.betaTester) {
  Bugsnag.start({
    apiKey: "f00b1e53db5b1ea6ece4789036536eb5",
    plugins: [new BugsnagPluginVue()],
    appVersion: process.env.VUE_APP_VERSION,
    metadata: {
      email: settings.email
    }
  })

  bugsnagEnabled = true

  Bugsnag.getPlugin('vue')
    .installVueErrorHandler(Vue)
}

export default Bugsnag
