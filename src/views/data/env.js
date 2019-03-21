const yargs = require('yargs')

const isProd = !!(yargs.argv.production)
module.exports = {
  PROD: isProd,
  DEV: !isProd
}