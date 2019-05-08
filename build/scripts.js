import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import named from 'vinyl-named'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import yargs from 'yargs'

import makeImportComponents from './make-import-components'
import notifyError from './notify-error'
import cfg from './../config'

// load gulp plugins
const $ = plugins()

// set ENV mode
const PRODUCTION = !!(yargs.argv.production)
cfg.webpack.mode = PRODUCTION ? 'production' : 'development'
cfg.webpack.plugins = [
  new webpack.DefinePlugin({ 'process.env.PRODUCTION': PRODUCTION })
]

export function buildJs(...entries) {
  // import components before js compilation
  makeImportComponents(`${__dirname}/../${cfg.src.html.partials}`)

  return gulp.src(entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(cfg.webpack, webpack))
    .on('error', notifyError)
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e) })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(cfg.dist.js))
}