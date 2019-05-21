import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import yargs from 'yargs'

import cfg from '../../config'

// load gulp plugins
const $ = plugins()

// set ENV mode
const PRODUCTION = !!(yargs.argv.production)

/**
 * Copy assets folders in dist/
 * @returns {Object} gulp
 */
export function copy() {
  return gulp.src(`${cfg.src.assets}**/*`)
    .pipe($.plumber())
    .pipe(gulp.dest(cfg.dist.assets))
}

/**
 * Images optimization with imagemin
 * @returns {Object} gulp
 */
export function compress(done, enabled = false) {
  if (cfg.src.img.enabled.compress || enabled) {
    return gulp.src(cfg.src.img.files)
      .pipe($.plumber())
      .pipe($.imagemin(cfg.src.img.compress))
      .pipe(gulp.dest(`${cfg.dist.assets}/img`))
  }
  done()
}

/**
 * Generate favicons images
 * @returns {Object} gulp
 */
export function favicons(done) {
  if (cfg.src.favicons.enabled) {
    return gulp.src(cfg.src.favicons.file)
      .pipe($.plumber())
      .pipe($.favicons(cfg.src.favicons.settings))
      .pipe(gulp.dest(`${cfg.dist.assets}/favicons`))
  }
  done()
}

/**
 * Generate SVG sprite icons
 * @returns {Object} gulp
 */
export function symbols(done) {
  if (!PRODUCTION) {
    cfg.src.icons.config.preview = { symbols: 'sprite-icons.html' }
  }

  if (cfg.src.icons.enabled) {
    return gulp.src(cfg.src.icons.files)
      .pipe($.plumber())
      .pipe($.svgSprites(cfg.src.icons.settings))
      .pipe(gulp.dest(`${cfg.dist.assets}/icons`))
  }
  done()
}

/**
 * Generate webp images
 * @returns {Object} gulp
 */
export function webp(done, enabled = false) {
  if (cfg.src.img.enabled.webp || enabled) {
    return gulp.src(cfg.src.img.files)
      .pipe($.plumber())
      .pipe($.webp())
      .pipe(gulp.dest(`${cfg.dist.assets}/img`))
  }
  done()
}