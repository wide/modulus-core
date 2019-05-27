'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _cookie = require('../../utils/cookie');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cookie = function (_Manager) {
  _inherits(Cookie, _Manager);

  function Cookie() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Cookie);

    var _this = _possibleConstructorReturn(this, (Cookie.__proto__ || Object.getPrototypeOf(Cookie)).call(this));

    _this.init(params);
    return _this;
  }

  /**
   * Init settings on cookie
   * @param {Object} params
   */


  _createClass(Cookie, [{
    key: 'init',
    value: function init() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.params = Object.assign({
        path: '/', // path of cookie
        expires: 525600 // 365 days = 525600 minutes
      }, params);
    }

    /**
     * Get cookie object
     * @return {Object}
     */

  }, {
    key: 'parser',
    value: function parser() {
      if (document.cookie === '') {
        return {};
      }
      return document.cookie.split('; ').map(function (value) {
        return value.split('=');
      }).reduce(function (acc, value) {
        if (value[0] !== undefined && value[0] !== 'undefined' && value[0] !== '') {
          value[1] = value[1] !== undefined ? value[1].trim() : '';
          acc[decodeURIComponent(value[0].trim())] = decodeURIComponent(value[1]);
        }
        return acc;
      }, {});
    }

    /**
     * Delete all values present in the cookie
     */

  }, {
    key: 'clear',
    value: function clear() {
      document.cookie.split(';').forEach(function (cookie) {
        if (cookie !== '') {
          document.cookie = (0, _cookie.setExpires)(cookie);
        }
      });
    }

    /**
     * Get an item from its key
     * @param {String} key
     * @returns {Object|String|undefined}
     */

  }, {
    key: 'get',
    value: function get(key) {
      var value = this.parser()[key] || undefined;
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }

    /**
     * Add an item from its key and value
     * @param {String} key
     * @param {*} object
     */

  }, {
    key: 'set',
    value: function set(key, object) {
      var date = new Date();
      date.setTime(+date + this.params.expires * 60 * 1000);

      object = typeof object === 'string' ? object : JSON.stringify(object);

      document.cookie = encodeURIComponent(key) + '=' + decodeURIComponent(object) + ';path=' + this.params.path + ';expires=' + date.toUTCString();
    }

    /**
     * Delete an item from its key
     * @param {String} key
     */

  }, {
    key: 'unset',
    value: function unset(key) {
      document.cookie = encodeURIComponent(key) + '=;expires=' + new Date().toUTCString();
    }
  }]);

  return Cookie;
}(_manager2.default);

exports.default = Cookie;
//# sourceMappingURL=cookie.js.map