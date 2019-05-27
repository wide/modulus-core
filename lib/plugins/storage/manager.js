'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Manager = function (_Plugin) {
  _inherits(Manager, _Plugin);

  function Manager() {
    _classCallCheck(this, Manager);

    return _possibleConstructorReturn(this, (Manager.__proto__ || Object.getPrototypeOf(Manager)).apply(this, arguments));
  }

  _createClass(Manager, [{
    key: 'all',

    /**
     * Get all the values present in the "Cookie / Storage"
     * @returns {Object}
     */
    value: function all() {
      return this.parser();
    }

    /**
     * Add an item "Cookie / Storage" from its key and value
     * @alias set
     * @param {String} key
     * @param {*} value
     */

  }, {
    key: 'create',
    value: function create(key, value) {
      this.set(key, value);
    }

    /**
     * Delete an item "Cookie / Storage" from its key
     * @alias unset
     * @param {String} key
     */

  }, {
    key: 'delete',
    value: function _delete(key) {
      this.unset(key);
    }

    /**
     * Get a JSON of all the values present in the "Cookie / Storage"
     * @returns {JSON}
     */

  }, {
    key: 'json',
    value: function json() {
      return JSON.stringify(this.parser());
    }
  }]);

  return Manager;
}(_plugin2.default);

exports.default = Manager;
//# sourceMappingURL=manager.js.map