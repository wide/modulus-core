import 'jspolyfill-array.prototype.find' // needed for bowser support
import 'es6-object-assign/auto' // needed for bowser support
import Bowser from 'bowser'


/**
 * Test if browser supports Webp image
 * @return {Promise<Boolean>}
 */
async function isWebpSupported() {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = img.onerror = () => resolve(img.height === 2)
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAIAAQAcJaQAA3AA/v3AgAA='
  })
}


/**
 * Detect browser capabilities
 */
async function resolveCapabilities() {

  // resolve browser features
  const browser = Bowser.getParser(window.navigator.userAgent)
  const platform = browser.getPlatformType(true)

  // resolve browser capabilities
  const capabilities = {
    touch: (platform === 'mobile' || platform === 'tablet'),
    platform: platform,
    os: browser.getOSName(true),
    engine: browser.getEngineName(true),
    name: (browser.getBrowserName(true) === 'internet explorer') ? 'ie' : name,
    version: `${name}${browser.getBrowserVersion().split('.')[0]}`,
    webp: await isWebpSupported()
  }

  // returns capabilities (javascript)
  window.capabilities = [
    capabilities.platform,
    capabilities.os,
    capabilities.engine,
    capabilities.name,
    capabilities.version,
  ]
  if(capabilities.touch) window.capabilities.push('touch-based')
  if(capabilities.webp) window.capabilities.push('webp')

  // returns capabilities (css)
  document.body.classList.add(`-${capabilities.platform}`)
  document.body.classList.add(`-${capabilities.os}`)
  document.body.classList.add(`-${capabilities.engine}`)
  document.body.classList.add(`-${capabilities.name}`)
  document.body.classList.add(`-${capabilities.version}`)
  if(capabilities.touch) document.body.classList.add('-touch-based')
  if(capabilities.webp) document.body.classList.add('-webp')

  return { browser, capabilities }
}


/**
 * Load polyfill as seperate files
 * @param {String} path
 * @param {Array} polyfills
 */
export default async ({ path, polyfills }) => {

  // get capabilities
  const { browser } = await resolveCapabilities()
  
  // load polyfill depending on browser need
  for(let i = 0; i < polyfills.length; i += 1) {
    if(browser.satisfies(polyfills[i].satisfies)) {
      for(let j = 0; j < polyfills[i].files.length; j++) {
        const script = document.createElement('script')
        script.src = `${path}${polyfills[i].files[j]}.js`
        document.body.appendChild(script)
        console.log('load polyfill:', polyfills[i].files[j])
      }
    }
  }
}