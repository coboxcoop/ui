require('dotenv').config()

process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_API_PORT = process.env.API_PORT || 9112
process.env.VUE_APP_BUGSNAG_API_KEY = process.env.BUGSNAG_API_KEY

module.exports = {}
