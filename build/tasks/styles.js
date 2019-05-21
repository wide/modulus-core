import browser from 'browser-sync'
import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import yargs from 'yargs'

import sassAliases from '../sass-alias'
import cfg from '../../config'

// load gulp plugins
const $ = plugins()

// set ENV mode
const PRODUCTION = !!(yargs.argv.production)

/**
 * Prefixes css files with Autoprefixer
 * @returns {Object} gulp
 */
export function autoprefixer() {
  return gulp.src(`${cfg.dist.css}/*.css`)
    .pipe($.plumber())
    .pipe($.autoprefixer(cfg.src.scss.autoprefixer))
    .pipe(gulp.dest(cfg.dist.css))
}

/**
 * Build css
 * @param  {...Array} entries
 * @returns {Object} gulp
 */
export function buildCss(...entries) {
  return gulp.src(entries)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sassGlob())
    .pipe($.sass({
      importer: [sassAliases(cfg.src.scss.alias)]
    }))
    .pipe($.if(PRODUCTION, $.cleanCss(cfg.src.scss.cleancss)))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(cfg.dist.css))
    .pipe(browser.reload({ stream: true }))
}