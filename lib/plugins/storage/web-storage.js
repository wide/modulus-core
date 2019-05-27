'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebStorage = function (_Manager) {
  _inherits(WebStorage, _Manager);

  function WebStorage() {
    var storage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'session';

    _classCallCheck(this, WebStorage);

    var _this = _possibleConstructorReturn(this, (WebStorage.__proto__ || Object.getPrototypeOf(WebStorage)).call(this));

    _this.storage = storage.toLowerCase().trim();
    return _this;
  }

  /**
   * Get storage object
   * @returns {Object} localStorage or sessionStorage
   */


  _createClass(WebStorage, [{
    key: 'parser',
    value: function parser() {
      if (this.storage === 'session') {
        return window.sessionStorage;
      }
      return window.localStorage;
    }

    /**
     * Delete all values present in the storage
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.parser().clear();
    }

    /**
     * Get an item from its key
     * @param {String} key
     * @returns {Object|String|undefined}
     */

  }, {
    key: 'get',
    value: function get(key) {
      var string = this.parser().getItem(key) || undefined;
      try {
        return JSON.parse(string);
      } catch (error) {
        return string;
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
      if (typeof object === 'string') {
        this.parser().setItem(key, object);
      } else {
        this.parser().setItem(key, JSON.stringify(object));
      }
    }

    /**
     * Delete an item from its key
     * @param {String} key
     */

  }, {
    key: 'unset',
    value: function unset(key) {
      try {
        this.parser().removeItem(key);
      } catch (error) {
        this.parser().removeItem('');
      }
    }
  }]);

  return WebStorage;
}(_manager2.default);

exports.default = WebStorage;
//# sourceMappingURL=web-storage.js.map