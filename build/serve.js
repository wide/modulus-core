import browser from 'browser-sync'

import cfg from './../config'

export function serve(done) {
  browser.init({
    server: {
      baseDir: cfg.dist.html,
      directory: true
    }
  })
  done()
}