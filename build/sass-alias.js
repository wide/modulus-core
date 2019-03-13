const path = require('path')

/**
 * Replace SCSS alias with real path
 */
module.exports = function(aliases) {
  return function(url) {
    const prefix = url.split('/').shift()
    if(aliases[prefix]) {
      return { file: path.normalize(aliases[prefix] + url.substr(prefix.length)) }
    }
    return null
  }
}