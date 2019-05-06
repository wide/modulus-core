import gulp from 'gulp'
import yargs from 'yargs'

import cfg from './config'

// build functions
import { copyAssets } from './build/assets'
import { resetPanini, buildPanini } from './build/panini'
import { buildJs } from './build/scripts'
import { buildCss } from './build/styles'
import { serve } from './build/serve'
import { watch } from './build/watch'

// modulus `create:*`
import createPlugin from './build/create-plugin'
import createController from './build/create-controller'
import createComponent from './build/create-component'


// build tasks
gulp.task('copy:assets', () => copyAssets())
gulp.task('clean:html', (done) => resetPanini(done))
gulp.task('build:css', () => buildCss(...cfg.src.scss.entries.map(entry => entry.file)))
gulp.task('build:html', () => buildPanini())
gulp.task('build:js', () => buildJs(...cfg.src.js.entries.map(entry => entry.file)))
gulp.task('serve', (done) => serve(done))
gulp.task('watch', (done) => watch(done))

// module `create:*` commands
gulp.task('create:component', (done) => createComponent(__dirname, yargs.argv.name, done))
gulp.task('create:controller', (done) => createController(__dirname, yargs.argv.name, done))
gulp.task('create:plugin', (done) => createPlugin(__dirname, yargs.argv.name, done))

// npm global tasks
gulp.task('build', gulp.series('clean:html', 'build:html', 'build:css', 'build:js', 'copy:assets'))
gulp.task('default', gulp.series('build', 'serve', 'watch'))