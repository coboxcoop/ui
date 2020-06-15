process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_API_PORT = process.env.API_PORT || 9112
process.env.VUE_APP_BUGS_URL = process.env.BUGS_URL || 'https://cobox.cloud/bugs'

module.exports = {}
