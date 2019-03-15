import path from 'path'

/**
 * Replace SCSS alias with real path
 */
function replaceAliases(url, aliases) {
  try {
    const prefix = url.split('/').shift()
    if(aliases[prefix]) {
      return { file: path.normalize(aliases[prefix] + url.substr(prefix.length)) }
    }
    return null
  }
  catch(err) {
    console.error('Cannot replace SCSS aliases:', err)
    throw err
  }
}

export default function(aliases) {
  return function(url) {
    return replaceAliases(url, aliases)
  }
}