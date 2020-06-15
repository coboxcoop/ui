process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_API_PORT = process.env.API_PORT || 9112
process.env.VUE_APP_HELP_URL = process.env.HELP_URL || 'https://cobox.cloud/help'

module.exports = {}
