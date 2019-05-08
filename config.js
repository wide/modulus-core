import path from 'path'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

export default {
  src: {
    assets: 'src/assets/{fonts,icons,img}/',
    scss: {
      root: 'src/assets/scss/',
      cleancss: {
        level: {
          0: {},
          1: { specialComments: 0 },
          2: {}
        },
      },
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
        bootstrap: path.resolve(`${__dirname}/node_modules/bootstrap/scss/`),
        swiper: path.resolve(`${__dirname}/node_modules/swiper/src/`),
      }
    },
    js: {
      root: 'src/assets/js/',
      entries: [{
        file: 'src/assets/js/main.js',
        watch: [
          'src/assets/js/**/*.js',
          'src/views/components/**/*.js',
          '!src/assets/js/polyfills.js',
          '!src/assets/js/polyfills/*'
        ]
      }]
    },
    polyfills: {
      root: 'src/assets/js/',
      entries: [{
        file: 'src/assets/js/polyfills.js',
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
    polyfills: 'dist/assets/js',
    html: 'dist/'
  },
  webpack: {
    mode: 'development',
    resolve: {
      alias: {
        '[ROOT]': __dirname,
        '~': path.resolve(`${__dirname}/src/assets/js/`),
        '@': path.resolve(`${__dirname}/src/views/components/`),
        modulus: path.resolve(`${__dirname}/src/assets/js/vendors/modulus/`),
        swiper: path.resolve(`${__dirname}/node_modules/swiper/dist/js/swiper.js`)
      }
    },
    module: {
      rules: [{
        test: /.js$/,
        use: [{ loader: 'babel-loader' }]
      }]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'initial',
          }
        }
      },
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false,
            }
          }
        })
      ]
    }
  },
  webpackPolyfills: {
    mode: 'development',
    resolve: {
      alias: {
        '[ROOT]': __dirname,
        '~': path.resolve(`${__dirname}/src/assets/js/`),
      }
    },
    module: {
      rules: [{
        test: /.js$/,
        use: [{ loader: 'babel-loader' }]
      }]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false,
            }
          }
        })
      ]
    }
  }
}