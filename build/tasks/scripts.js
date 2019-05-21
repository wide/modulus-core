import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import named from 'vinyl-named'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import yargs from 'yargs'

import makeImportComponents from '../make-import-components'
import cfg from '../../config'

// load gulp plugins
const $ = plugins()

// set ENV mode
const PRODUCTION = !!(yargs.argv.production)

/**
 * Set Webpack config
 * @param {String} configId
 */
function setWebpackConfig(configId) {
  cfg[configId].mode = PRODUCTION ? 'production' : 'development'
  cfg[configId].plugins = [
    new webpack.DefinePlugin({ 'process.env.PRODUCTION': PRODUCTION })
  ]
}

/**
 * Build main.js
 * @param  {...Array} entries
 * @returns {Object} gulp
 */
export function buildJs(...entries) {
  setWebpackConfig('webpack')

  // import components before js compilation
  makeImportComponents(`${__dirname}/../../${cfg.src.html.partials}`)

  return gulp.src(entries)
    .pipe($.plumber())
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(cfg.webpack, webpack))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(cfg.dist.js))
}

/**
 * Build polyfills
 * @param  {...Array} entries
 * @returns {Object} gulp
 */
export function polyfills(...entries) {
  setWebpackConfig('webpackPolyfills')

  return gulp.src(entries)
    .pipe($.plumber())
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(cfg.webpackPolyfills, webpack))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(cfg.dist.polyfills))
}