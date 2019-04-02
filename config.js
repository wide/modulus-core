import path from 'path'

export default {
  src: {
    assets: 'src/assets/{fonts,icons,img}/',
    scss: {
      root: 'src/assets/scss/',
      entries: [{
        file: 'src/assets/scss/main.scss',
        watch: [
          'src/assets/scss/**/*.scss',
          'src/views/components/**/*.scss',
        ]
      }],
      alias: {
        '~': path.resolve(`${__dirname}/src/assets/scss/`),
        '@': path.resolve(`${__dirname}/src/views/components/`),
        bootstrap: path.resolve(`${__dirname}/node_modules/bootstrap/scss/`)
      }
    },
    js: {
      root: 'src/assets/js/',
      entries: [{
        file: 'src/assets/js/main.js',
        watch: [
          'src/assets/js/**/*.js',
          'src/views/components/**/*.js',
          '!src/assets/js/polyfill.js',
          '!src/assets/js/polyfills/*'
        ]
      }, {
        file: 'src/assets/js/polyfill.js',
        watch: []
      }, {
        file: 'src/assets/js/polyfills/*',
        watch: []
      }]
    },
    html: {
      pages: 'src/views/pages/',
      layouts: 'src/views/layouts/',
      partials: 'src/views/components/',
      helpers: 'src/views/helpers/',
      data: 'src/views/data/',
      options: {
        prettify: {
          wrap_line_length: 0
        }
      }
    }
  },
  dist: {
    assets: 'dist/assets/',
    css: 'dist/assets/css',
    js: 'dist/assets/js',
    html: 'dist/'
  },
  webpack: {
    mode: 'development',
    resolve: {
      alias: {
        '[ROOT]': __dirname,
        '~': path.resolve(`${__dirname}/src/assets/js/`),
        '@': path.resolve(`${__dirname}/src/views/components/`),
        modulus: path.resolve(`${__dirname}/src/assets/js/vendors/modulus/`)
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