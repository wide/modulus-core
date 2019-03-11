const yargs = require('yargs')

const isProd = !!(yargs.argv.production)
module.exports = {
  foo: 'bar',
  PROD: isProd,
  DEV: !isProd
}