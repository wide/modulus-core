const path = require('path')
const fs = require('fs')

module.exports = function(filepath) {
  const realpath = path.resolve(__dirname, '../../assets/icons/', `${filepath}.svg`)
  return fs.readFileSync(realpath)
}