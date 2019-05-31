import 'jspolyfill-array.prototype.find' // needed for bowser support
import Bowser from 'bowser'

// resolve browser features
export const browser = Bowser.getParser(window.navigator.userAgent)

const platform = browser.getPlatformType(true)
let name = browser.getBrowserName(true)
if(name === 'internet explorer') name = 'ie'

export const capabilities = {
  touch: (platform === 'mobile' || platform === 'tablet'),
  platform: platform,
  os: browser.getOSName(true),
  engine: browser.getEngineName(true),
  name: name,
  version: `${name}${browser.getBrowserVersion().split('.')[0]}`
}


/**
 * Adds classes based on the user's environment on
 * the <body> element. This makes it possible to be
 * able to manage some particular case in css.
 */
function resolveCapabilities() {

  // returns capabilities (javascript)
  window.capabilities = [
    capabilities.touch ? 'touch-based' : 'not-touch-based',
    capabilities.platform,
    capabilities.os,
    capabilities.engine,
    capabilities.name,
    capabilities.version
  ]

  // returns capabilities (css)
  document.body.classList.add(capabilities.touch ? '-touch-based' : '-not-touch-based')
  document.body.classList.add(`-${capabilities.platform}`)
  document.body.classList.add(`-${capabilities.os}`)
  document.body.classList.add(`-${capabilities.engine}`)
  document.body.classList.add(`-${capabilities.name}`)
  document.body.classList.add(`-${capabilities.version}`)

  // webp support
  const webp = new Image()
  webp.onload = webp.onerror = () => {
    if (webp.height === 2) {
      window.capabilities.push('webp')
      document.body.classList.add(`-webp`)
    }
  }
  webp.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAIAAQAcJaQAA3AA/v3AgAA='
}


/**
 * Load polyfill as seperate files
 * @param {String} root path
 * @param {Array} polyfills
 */
export default ({ root, polyfills = [] }) => {

  resolveCapabilities()

  // add polyfills script in document
  for (let i = 0; i < polyfills.length; i += 1) {
    if (browser.satisfies(polyfills[i].satisfies)) {
      for(let j = 0; j < polyfills[i].files.length; j++) {
        const script = document.createElement('script')
        script.src = `${root}${polyfills[i].files[j]}.js`
        document.body.appendChild(script)
        console.log('load polyfill:', polyfills[i].files[j])
      }
    }
  }

}
