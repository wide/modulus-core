import handlebars from 'handlebars'
import helpers from 'handlebars-helpers'
import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import panini from 'panini'
import prettify from 'prettify'

import cfg from '../../config'

// load gulp plugins
const $ = plugins()

// register helpers
prettify.register(handlebars, cfg.src.html.options.prettify)
helpers({ handlebars })

/**
 * Reset Panini's cache of layouts and partials
 * @param {Function} done (callback)
 */
export function resetPanini(done) {
  panini.refresh()
  done()
}

/**
 * Compile layouts, pages, and partials into flat HTML files
 * @returns {Object} gulp
 */
export function buildPanini() {
  return gulp.src(`${cfg.src.html.pages}**/*.html`)
    .pipe($.plumber())
    .pipe(panini({
      root: cfg.src.html.pages,
      layouts: cfg.src.html.layouts,
      partials: cfg.src.html.partials,
      helpers: cfg.src.html.helpers,
      data: cfg.src.html.data
    }))
    .pipe(gulp.dest(cfg.dist.html))
}