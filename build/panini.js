import handlebars from 'handlebars'
import helpers from 'handlebars-helpers'
import gulp from 'gulp'
import panini from 'panini'
import prettify from 'prettify'

import notifyError from './notify-error'
import cfg from './../config'

// register helpers
prettify.register(handlebars, cfg.src.html.options.prettify)
helpers({ handlebars })

/**
 * Reset Panini's cache of layouts and partials
 * @param {*} done
 */
export function resetPanini(done) {
  panini.refresh()
  done()
}

/**
 * Compile layouts, pages, and partials into flat HTML files
 * @returns {}
 */
export function buildPanini() {
  return gulp.src(`${cfg.src.html.pages}**/*.html`)
    .pipe(panini({
      root: cfg.src.html.pages,
      layouts: cfg.src.html.layouts,
      partials: cfg.src.html.partials,
      helpers: cfg.src.html.helpers,
      data: cfg.src.html.data
    }))
    .on('error', notifyError)
    .pipe(gulp.dest(cfg.dist.html))
}