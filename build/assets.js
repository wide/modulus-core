import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import yargs from 'yargs'

import cfg from './../config'

// load gulp plugins
const $ = plugins()

// set ENV mode
const PRODUCTION = !!(yargs.argv.production)

/**
 * Copy assets folders in dist/
 */
export function copyAssets() {
  return gulp.src(`${cfg.src.assets}**/*`)
    .pipe($.plumber())
    .pipe(gulp.dest(cfg.dist.assets))
}

export function buildSvgSprite() {
  if (!PRODUCTION) {
    cfg.src.icons.config.preview = { symbols: 'sprite-icons.html' }
  }

  return gulp.src(cfg.src.icons.files)
    .pipe($.plumber())
    .pipe($.svgSprites(cfg.src.icons.config))
    .pipe(gulp.dest(cfg.dist.icons))
}