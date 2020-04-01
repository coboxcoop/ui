process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_API_PORT = process.env.API_PORT || 3000

module.exports = {}