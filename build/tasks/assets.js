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
export function compress() {
  return gulp.src(cfg.src.img.files)
    .pipe($.plumber())
    .pipe($.imagemin(cfg.src.img.compress))
    .pipe(gulp.dest(`${cfg.dist.assets}img`))
}

/**
 * Generate favicons images
 * @returns {Object} gulp
 */
export function favicons() {
  return gulp.src('src/assets/favicon.png')
    .pipe($.plumber())
    .pipe($.favicons(cfg.src.favicons))
    .pipe(gulp.dest('dist/assets/favicons'));
}

/**
 * Generate SVG sprite icons
 * @returns {Object} gulp
 */
export function symbols() {
  if (!PRODUCTION) {
    cfg.src.icons.config.preview = { symbols: 'sprite-icons.html' }
  }

  return typeof(gulp.src(cfg.src.icons.files)
    .pipe($.plumber())
    .pipe($.svgSprites(cfg.src.icons.config))
    .pipe(gulp.dest(`${cfg.dist.assets}icons`)))
}

/**
 * Generate webp images
 * @returns {Object} gulp
 */
export function webp() {
  return gulp.src(cfg.src.img.files)
    .pipe($.plumber())
    .pipe($.webp())
    .pipe(gulp.dest(`${cfg.dist.assets}img`))
}
