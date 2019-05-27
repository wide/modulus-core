'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function (_EventEmitter) {
  _inherits(Component, _EventEmitter);

  /**
   * New Component
   * @param {HTMLElement}   el
   * @param {Object}        opts
   * @param {Object}        opts.attrs - element attributes
   * @param {DOMStringMap}  opts.dataset - element dataset attributes
   * @param {Object}        opts.refs - HTMLElement found by `[ref]`
   */
  function Component(el, _ref) {
    var attrs = _ref.attrs,
        dataset = _ref.dataset,
        refs = _ref.refs;

    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

    _this.el = el;
    _this.attrs = attrs;
    _this.dataset = dataset;
    _this.refs = refs;
    return _this;
  }

  /**
   * Initialize component 
   */


  _createClass(Component, [{
    key: 'onInit',
    value: function onInit() {}

    /**
     * Destroy component
     */

  }, {
    key: 'onDestroy',
    value: function onDestroy() {}

    /**
     * Alias of querySelector()
     * @param {String} selector
     * @return {HTMLElement}
     */

  }, {
    key: 'child',
    value: function child(selector) {
      return this.el.querySelector(selector);
    }

    /**
     * Alias of querySelectorAll()
     * @param {String} selector 
     * @return {NodeList}
     */

  }, {
    key: 'children',
    value: function children(selector) {
      return this.el.querySelectorAll(selector);
    }

    /**
     * Listen to global event bus
     * @param {String} event 
     * @param {Function} callback 
     */

  }, {
    key: '$on',
    value: function $on(event, callback) {
      this.$modulus.on(event, function () {
        return callback.apply(undefined, arguments);
      });
    }

    /**
     * Emit to both global and local event bus
     * @param {String} event 
     * @param  {...any} args 
     */

  }, {
    key: '$emit',
    value: function $emit(event) {
      var _$modulus;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.emit.apply(this, [event].concat(args)); // local
      (_$modulus = this.$modulus).emit.apply(_$modulus, [event].concat(args)); // global
    }
  }]);

  return Component;
}(_tinyEmitter2.default);

exports.default = Component;
//# sourceMappingURL=component.js.map