import plugins        from 'gulp-load-plugins'
import yargs          from 'yargs'
import browser        from 'browser-sync'
import gulp           from 'gulp'
import panini         from 'panini'
import webpackStream  from 'webpack-stream'
import webpack2       from 'webpack'
import named          from 'vinyl-named'
import path           from 'path'

const $ = plugins()
const PRODUCTION = !!(yargs.argv.production)


/**
 * CONFIG
 */

const cfg = {
  src: {
    assets: 'src/assets/',
    scss: 'src/assets/scss/',
    scss_main: 'src/assets/scss/main.scss',
    js: 'src/assets/js/',
    js_main: 'src/assets/js/main.js',
    pages: 'src/views/pages/',
    layouts: 'src/views/layouts/',
    partials: 'src/views/partials/',
    helpers: 'src/views/helpers/',
    data: 'src/views/data/',
  },
  dist: {
    assets: 'dist/assets/',
    css: 'dist/assets/css',
    js: 'dist/assets/js',
    pages: 'dist/'
  },
  alias: {
    scss: [
      'node_modules/bootstrap/scss/'
    ]
  },
  webpack: {
    mode: PRODUCTION ? 'production' : 'development',
    resolve: {
      alias: {
        '~': path.resolve(`${__dirname}/src/assets/js/`),
        modulus: path.resolve(`${__dirname}/src/assets/js/libs/modulus/`)
      }
    },
    module: {
      rules: [{
        test: /.js$/,
        use: [{ loader: 'babel-loader' }]
      }]
    }
  }
}


/**
 * TASKS
 */

// delete templates
gulp.task('clear:html', function(done) {
  panini.refresh()
  done()
})

// build copy assets
gulp.task('copy:assets', function() {
  return gulp.src(`${cfg.src.assets}{fonts,icons,img}`)
    .pipe(gulp.dest(cfg.dist.assets))
})

// build handlebars to html
gulp.task('build:html', function() {
  return gulp.src(`${cfg.src.pages}**/*.{html,hbs,handlebars}`)
    .pipe(panini({
      root: cfg.src.pages,
      layouts: cfg.src.layouts,
      partials: cfg.src.partials,
      helpers: cfg.src.helpers,
      data: cfg.src.data
    }))
    .pipe(gulp.dest(cfg.dist.pages))
})

// build scss to css
gulp.task('build:css', function() {
  return gulp.src([cfg.src.scss_main])
    .pipe($.sourcemaps.init())
    .pipe($.sass({ includePaths: cfg.alias.scss })
    .on('error', $.sass.logError))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(cfg.dist.css))
    .pipe(browser.reload({ stream: true }))
})

// build js
gulp.task('build:js', function() {
  return gulp.src(cfg.src.js_main)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(cfg.webpack, webpack2))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e) })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(cfg.dist.js))
})

// serve files
gulp.task('serve', function(done) {
  browser.init({
		server: {
			baseDir: cfg.dist.pages,
			directory: true
    }
  })
  done()
})

// watch changes
function watch() {
  gulp.watch(`${cfg.src.assets}{fonts,icons,img}`, gulp.series('copy:assets'))
  gulp.watch(`${cfg.src.pages}**/*.html`).on('all', gulp.series('clear:html', 'build:html', browser.reload))
  gulp.watch(`${cfg.src.layouts}**/*.html`).on('all', gulp.series('clear:html', 'build:html', browser.reload))
  gulp.watch(`${cfg.src.partials}**/*.html`).on('all', gulp.series('clear:html', 'build:html', browser.reload))
  gulp.watch(`${cfg.src.scss}**/*.scss`).on('all', gulp.series('build:css'))
  gulp.watch(`${cfg.src.js}**/*.js`).on('all', gulp.series('build:js', browser.reload))
}

// npm tasks
gulp.task('build', gulp.series('clear:html', 'build:html', 'build:css', 'build:js'))
gulp.task('default', gulp.series('build', 'serve', watch))