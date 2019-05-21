import { parallel, series, task } from 'gulp'
import yargs from 'yargs'

import cfg from './config'

// build functions
import { copy, compress, favicons, symbols, webp } from './build/tasks/assets'
import { serve, watch } from './build/tasks/browser'
import { buildJs, polyfills } from './build/tasks/scripts'
import { buildCss, autoprefixer } from './build/tasks/styles'
import { buildPanini, resetPanini } from './build/tasks/views'

// modulus `create:*`
import createPlugin from './build/modulus/create-plugin'
import createController from './build/modulus/create-controller'
import createComponent from './build/modulus/create-component'

// assets tasks
task('assets:copy', () => copy())
task('assets:favicons', (done) => favicons(done))
task('assets:ico.symbols', (done) => symbols(done))
task('assets:img.webp', (done) => webp(done))
task('assets:img.webp.enabled', (done) => webp(done, true))
task('assets:img.compress', (done) => compress(done))
task('assets:img.compress.enabled', (done) => compress(done, true))

// browser tasks
task('browser:serve', (done) => serve(done))
task('browser:watch', (done) => watch(done))

// scripts tasks
task('scripts:build', () => buildJs(...cfg.src.js.entries.map(entry => entry.file)))
task('scripts:polyfills', () => polyfills(...cfg.src.polyfills.entries.map(entry => entry.file)))

// styles tasks
task('styles:build', () => buildCss(...cfg.src.scss.entries.map(entry => entry.file)))
task('styles:autoprefixer', () => autoprefixer())

// views tasks
task('views:build', () => buildPanini())
task('views:reset', (done) => resetPanini(done))

// npm global tasks
task('build',
  series(
    'views:reset',
    parallel(
      'scripts:build',
      'styles:build',
      'views:build'
    ),
    parallel(
      'assets:copy',
      'assets:favicons',
      'scripts:polyfills',
      'styles:autoprefixer'
    ),
    parallel(
      'assets:ico.symbols',
      'assets:img.compress',
      'assets:img.webp'
    )
  )
)
task('default', series('build', 'browser:serve', 'browser:watch'))

// modulus `create:*` commands
task('create:component', (done) => createComponent(__dirname, yargs.argv.name, done))
task('create:controller', (done) => createController(__dirname, yargs.argv.name, done))
task('create:plugin', (done) => createPlugin(__dirname, yargs.argv.name, done))