import browser from 'browser-sync'
import gulp from 'gulp'

import { buildJs } from './scripts'
import { buildCss } from './styles'
import cfg from './../config'

export function watch(done) {
  gulp.watch(`${cfg.src.assets}**/*`, gulp.series('copy:assets'))

  gulp.watch([
    `${cfg.src.html.pages}**/*.html`,
    `${cfg.src.html.layouts}**/*.html`,
    `${cfg.src.html.partials}**/*.html`,
    `${cfg.src.html.data}**/*.yml`
  ]).on('all', gulp.series('clean:html', 'build:html', browser.reload))

  cfg.src.scss.entries.forEach(entry => {
    gulp.watch([entry.file, ...entry.watch])
      .on('all', gulp.series(() => buildCss(entry.file)))
  })

  cfg.src.js.entries.forEach(entry => {
    gulp.watch([entry.file, ...entry.watch])
      .on('all', gulp.series(() => buildJs(entry.file), browser.reload))
  })

  done()
}