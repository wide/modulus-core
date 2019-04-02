const Bowser = require('bowser')
const browser = Bowser.getParser(window.navigator.userAgent)

/**
 * Polyfills configuration.
 * `file`: name of the file to be loaded
 * `satisfies`: define the minimum required environment
 */
const polyfillsConfig = [
  {
    file: 'object-fit',
    satisfies: browser.satisfies({
      'Chrome': '<=30',
      'Firefox': '<=35',
      'Internet Explorer': '<=11',
      'Microsoft Edge': '<=18',
      'Opera': '<=18',
      'Safari': '<=10'
    })
  },
  {
    file: 'picturefill',
    satisfies: browser.satisfies({
      'Chrome': '<=37',
      'Firefox': '<=37',
      'Internet Explorer': '<=11',
      'Microsoft Edge': '<=12',
      'Opera': '<=24',
      'Safari': '<=9'
    })
  }
]

// add polyfills script in document
for (let i = 0; i < polyfillsConfig.length; i += 1) {
  if (polyfillsConfig[i].satisfies) {
    const script = document.createElement('script')
    script.src = `${window.$config.root}assets/js/${polyfillsConfig[i].file}.js`
    document.body.appendChild(script)
  }
}


/**
 * Adds classes based on the user's environment on
 * the <body> element. This makes it possible to be
 * able to manage some particular case in css.
 */
const platform = browser.getPlatformType(true)
const name = (browser.getBrowserName(true) === 'internet explorer')
  ? 'ie'
  : browser.getBrowserName(true)

document.body.classList.add(`${(platform === 'mobile' || platform === 'tablet') ? '-touch-based' : '-not-touch-based'}`)
document.body.classList.add(`-${platform}`)
document.body.classList.add(`-${browser.getOSName(true)}`)
document.body.classList.add(`-${browser.getEngineName(true)}`)
document.body.classList.add(`-${name}`)
document.body.classList.add(`-${name}${browser.getBrowserVersion().split('.')[0]}`)