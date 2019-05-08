import browser from 'browser-sync'
import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import yargs from 'yargs'

import notifyError from './notify-error'
import sassAliases from './sass-alias'
import cfg from './../config'

// load gulp plugins
const $ = plugins()

// set ENV mode
const PRODUCTION = !!(yargs.argv.production)

export function buildCss(...entries) {
  return gulp.src(entries)
    .pipe($.sourcemaps.init())
    .pipe($.sassGlob())
    .pipe($.sass({
      importer: [sassAliases(cfg.src.scss.alias)]
    }))
    .on('error', $.sass.logError)
    .on('error', notifyError)
    .pipe($.if(PRODUCTION, $.cleanCss(cfg.src.scss.cleancss)))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(cfg.dist.css))
    .pipe(browser.reload({ stream: true }))
}