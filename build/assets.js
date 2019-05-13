import gulp from 'gulp'
import plugins from 'gulp-load-plugins'

import cfg from './../config'

// load gulp plugins
const $ = plugins()

/**
 * Copy assets folders in dist/
 */
export function copyAssets() {
  return gulp.src(`${cfg.src.assets}**/*`)
    .pipe($.plumber())
    .pipe(gulp.dest(cfg.dist.assets))
}
