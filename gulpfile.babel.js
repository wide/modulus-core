import plugins        from 'gulp-load-plugins'
import yargs          from 'yargs'
import browser        from 'browser-sync'
import gulp           from 'gulp'
import panini         from 'panini'
import handlebars     from 'handlebars'
import prettify       from 'prettify'
import helpers        from 'handlebars-helpers'
import webpackStream  from 'webpack-stream'
import webpack2       from 'webpack'
import named          from 'vinyl-named'

import sassAliases          from './build/sass-alias'
import makeImportComponents from './build/make-import-components'
import createPlugin         from './build/create-plugin'
import createController     from './build/create-controller'
import createComponent      from './build/create-component'
import cfg                  from './config'

// gulp plugins
const $ = plugins()

// set ENV mode
const PRODUCTION = !!(yargs.argv.production)
cfg.webpack.mode = PRODUCTION ? 'production' : 'development'
cfg.webpack.plugins = [
  new webpack2.DefinePlugin({ 'process.env.PRODUCTION': PRODUCTION })
]

// register helpers
prettify.register(handlebars, cfg.src.html.options.prettify)
helpers({ handlebars })


/**
 * TASKS
 */

// delete templates
function clearHTML(done) {
  panini.refresh()
  done()
}

// build copy assets
function copyAssets() {
  return gulp.src(`${cfg.src.assets}**/*`)
    .pipe(gulp.dest(cfg.dist.assets))
}

// build handlebars to html
function buildHTML() {
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

// build scss to css
function buildCSS(...entries) {
  return gulp.src(entries)
    .pipe($.sourcemaps.init())
    .pipe($.sassGlob())
    .pipe($.sass({
      importer: [sassAliases(cfg.src.scss.alias)]
    }))
    .on('error', $.sass.logError)
    .on('error', notifyError)
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(cfg.dist.css))
    .pipe(browser.reload({ stream: true }))
}

// build js
function buildJS(...entries) {

  // import components before js compilation
  makeImportComponents(__dirname + '/' + cfg.src.html.partials)

  return gulp.src(entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(cfg.webpack, webpack2))
    .on('error', notifyError)
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e) })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(cfg.dist.js))
}

// serve files
function serve(done) {
  browser.init({
    server: {
      baseDir: cfg.dist.html,
      directory: true
    }
  })
  done()
}

// send compilation error to browser
function notifyError(err) {
  if(err && err.formatted) {
    browser.notify(`<div style="color: red; text-align: left;">${err.formatted.replace(/\n/g, '<br>')}</div>`, 20000)
  }
}

// watch changes
function watch() {

  gulp.watch(`${cfg.src.assets}**/*`, gulp.series(copyAssets))

  gulp.watch([
    `${cfg.src.html.pages}**/*.html`,
    `${cfg.src.html.layouts}**/*.html`,
    `${cfg.src.html.partials}**/*.html`,
    `${cfg.src.html.data}**/*.yml`
  ]).on('all', gulp.series(clearHTML, buildHTML, browser.reload))

  cfg.src.scss.entries.forEach(entry => {
    gulp.watch([entry.file, ...entry.watch])
      .on('all', gulp.series(() => buildCSS(entry.file)))
  })

  cfg.src.js.entries.forEach(entry => {
    gulp.watch([entry.file, ...entry.watch]).on('all', gulp.series(() => buildJS(entry.file), browser.reload))
  })
}

// npm tasks
gulp.task('clean:html', clearHTML)
gulp.task('copy:assets', copyAssets)
gulp.task('build:html', buildHTML)
gulp.task('build:css', () => buildCSS(...cfg.src.scss.entries.map(entry => entry.file)))
gulp.task('build:js', () => buildJS(...cfg.src.js.entries.map(entry => entry.file)))
gulp.task('serve', serve)

gulp.task('create:plugin', (done) => createPlugin(__dirname, yargs.argv.name, done))
gulp.task('create:controller', (done) => createController(__dirname, yargs.argv.name, done))
gulp.task('create:component', (done) => createComponent(__dirname, yargs.argv.name, done))

// npm global tasks
gulp.task('build', gulp.series('clean:html', 'build:html', 'build:css', 'build:js', 'copy:assets'))
gulp.task('default', gulp.series('build', 'serve', watch))