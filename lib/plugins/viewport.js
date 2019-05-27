'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _attrAnim = require('./viewport/attr-anim');

var _attrAnim2 = _interopRequireDefault(_attrAnim);

var _attrLazy = require('./viewport/attr-lazy');

var _attrLazy2 = _interopRequireDefault(_attrLazy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Viewport = function (_Plugin) {
  _inherits(Viewport, _Plugin);

  /**
   * New viewport plugin
   * @param {Object} opts
   * @param {Object} opts.config
   * @param {Object} opts.animations list of JS animations
   */
  function Viewport(_ref) {
    var config = _ref.config,
        animations = _ref.animations;

    _classCallCheck(this, Viewport);

    var _this = _possibleConstructorReturn(this, (Viewport.__proto__ || Object.getPrototypeOf(Viewport)).call(this));

    _this.observers = [];
    _this.animations = animations;

    _this.config = Object.assign({
      animOffset: '-120px'
    }, config);

    _this.attributes = {
      'data-anim': _attrAnim2.default,
      'data-src': _attrLazy2.default
    };
    return _this;
  }

  /**
   * Bind plugin necessities
   */


  _createClass(Viewport, [{
    key: 'onInit',
    value: function onInit() {
      var _this2 = this;

      // clear observers (@todo reduce scope to root param)
      this.$on('dom.destroyed', function (root) {
        _this2.observers.map(function (o) {
          return o.disconnect();
        });
        _this2.observers = [];
      });
    }

    /**
     * Observe an element when it intersects in the viewport
     * @param {Object}                opts
     * @param {HTMLElement}           opts.scope      parent element to set the scope
     * @param {HTMLElement|NodeList}  opts.target     element(s) to observe in the scope
     * @param {Boolean}               opts.once       trigger only once and destroy the listener
     * @param {Boolean}               opts.enter      trigger only when the element appears
     * @param {Boolean}               opts.leave      trigger only when the element disappears
     * @param {String}                opts.offset     margin around scope to defer trigger
     * @param {Function}              opts.callback   action to call
     */

  }, {
    key: 'observe',
    value: function observe(_ref2) {
      var scope = _ref2.scope,
          target = _ref2.target,
          _ref2$once = _ref2.once,
          once = _ref2$once === undefined ? true : _ref2$once,
          _ref2$enter = _ref2.enter,
          enter = _ref2$enter === undefined ? true : _ref2$enter,
          _ref2$leave = _ref2.leave,
          leave = _ref2$leave === undefined ? false : _ref2$leave,
          offset = _ref2.offset,
          callback = _ref2.callback;


      // keep track of element entering at least once
      var hasEntered = false;

      // create viewport observer
      var observer = new IntersectionObserver(function (entries) {

        // for all observed elements
        for (var i = 0; i < entries.length; i++) {

          // process if :
          // - `enter` is specified and element is entering the viewport
          // - `leave` is specified and element is leaving after entering at least once
          if (enter && entries[i].isIntersecting || hasEntered && leave && !entries[i].isIntersecting) {

            // set element has entered once
            if (enter && !hasEntered) hasEntered = true;

            // call the action, give the element as first param
            callback(entries[i].target, entries[i]);

            // unobserve if the `once` is specifies
            if (once) observer.unobserve(entries[i].target);
          }
        }
      }, { root: scope, rootMargin: offset });

      // start to observe element(s)
      var els = target instanceof NodeList ? target : [target];
      for (var i = 0; i < els.length; i++) {
        observer.observe(els[i]);
      } // register observer for futur destruction
      this.observers.push(observer);
      return observer;
    }
  }]);

  return Viewport;
}(_plugin2.default);

exports.default = Viewport;
//# sourceMappingURL=viewport.js.map