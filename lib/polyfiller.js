'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capabilities = exports.browser = undefined;

require('jspolyfill-array.prototype.find');

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// resolve browser features
var browser = exports.browser = _bowser2.default.getParser(window.navigator.userAgent); // needed for bowser support


var platform = browser.getPlatformType(true);
var name = browser.getBrowserName(true);
if (name === 'internet explorer') name = 'ie';

var capabilities = exports.capabilities = {
  touch: platform === 'mobile' || platform === 'tablet',
  platform: platform,
  os: browser.getOSName(true),
  engine: browser.getEngineName(true),
  name: name,
  version: '' + name + browser.getBrowserVersion().split('.')[0]

  /**
   * Adds classes based on the user's environment on
   * the <body> element. This makes it possible to be
   * able to manage some particular case in css.
   */
};function resolveCapabilities() {

  // returns capabilities (javascript)
  window.capabilities = [capabilities.touch ? 'touch-based' : 'not-touch-based', capabilities.platform, capabilities.os, capabilities.engine, capabilities.name, capabilities.version];

  // returns capabilities (css)
  document.body.classList.add(capabilities.touch ? '-touch-based' : '-not-touch-based');
  document.body.classList.add('-' + capabilities.platform);
  document.body.classList.add('-' + capabilities.os);
  document.body.classList.add('-' + capabilities.engine);
  document.body.classList.add('-' + capabilities.name);
  document.body.classList.add('-' + capabilities.version);

  // webp support
  var webp = new Image();
  webp.onload = webp.onerror = function () {
    if (webp.height === 2) {
      window.capabilities.push('webp');
      document.body.classList.add('-webp');
    }
  };
  webp.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAIAAQAcJaQAA3AA/v3AgAA=';
}

/**
 * Load polyfill as seperate files
 * @param {String} root path
 * @param {Array} polyfills
 */

exports.default = function (root) {
  var polyfills = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


  resolveCapabilities();

  var _polyfills = polyfills.map(function (p) {
    return {
      files: p.files,
      satisfies: browser.satisfies(p.satisfies)
    };
  });

  // add polyfills script in document
  for (var i = 0; i < _polyfills.length; i += 1) {
    if (_polyfills[i].satisfies) {
      for (var j = 0; j < _polyfills[i].files.length; j++) {
        var script = document.createElement('script');
        script.src = '' + root + _polyfills[i].files[j] + '.js';
        document.body.appendChild(script);
        console.log('load polyfill:', _polyfills[i].files[j]);
      }
    }
  }
};
//# sourceMappingURL=polyfiller.js.map