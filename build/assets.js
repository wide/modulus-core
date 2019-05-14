import gulp from 'gulp'

import cfg from './../config'

/**
 * Copy assets folders in dist/
 */
export function copyAssets() {
  return gulp.src(`${cfg.src.assets}**/*`)
    .pipe(gulp.dest(cfg.dist.assets))
}
