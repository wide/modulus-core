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
import cfg            from './config'

// gulp plugins
const $ = plugins()
const PRODUCTION = !!(yargs.argv.production)
cfg.webpack.mode = PRODUCTION ? 'production' : 'development'

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
  return gulp.src(`${cfg.src.html.pages}**/*.{html,hbs,handlebars}`)
    .pipe(panini({
      root: cfg.src.html.pages,
      layouts: cfg.src.html.layouts,
      partials: cfg.src.html.partials,
      helpers: cfg.src.html.helpers,
      data: cfg.src.html.data
    }))
    .pipe(gulp.dest(cfg.dist.html))
}

// build scss to css
function buildCSS(...entries) {
  return gulp.src(entries)
    .pipe($.sourcemaps.init())
    .pipe($.sass({ includePaths: cfg.src.scss.alias })
    .on('error', $.sass.logError))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(cfg.dist.css))
    .pipe(browser.reload({ stream: true }))
}

// build js
function buildJS(...entries) {
  return gulp.src(entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(cfg.webpack, webpack2))
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

// watch changes
function watch() {

  gulp.watch(`${cfg.src.assets}**/*`, gulp.series(copyAssets))

  gulp.watch([
    `${cfg.src.html.pages}**/*.html`,
    `${cfg.src.html.layouts}**/*.html`,
    `${cfg.src.html.partials}**/*.html`
  ]).on('all', gulp.series(clearHTML, buildHTML, browser.reload))

  cfg.src.scss.entries.forEach(entry => {
    gulp.watch([entry.file, ...entry.watch]).on('all', gulp.series(() => buildCSS(entry.file)))
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

// npm global tasks
gulp.task('build', gulp.series('clean:html', 'build:html', 'build:css', 'build:js', 'copy:assets'))
gulp.task('default', gulp.series('build', 'serve', watch))