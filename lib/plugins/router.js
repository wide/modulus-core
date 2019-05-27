'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _pjax = require('pjax');

var _pjax2 = _interopRequireDefault(_pjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = function (_Plugin) {
  _inherits(Router, _Plugin);

  function Router(_ref) {
    var config = _ref.config,
        transitions = _ref.transitions,
        _ref$container = _ref.container,
        container = _ref$container === undefined ? 'main' : _ref$container,
        _ref$fallback = _ref.fallback,
        fallback = _ref$fallback === undefined ? 'noop' : _ref$fallback;

    _classCallCheck(this, Router);

    var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this));

    _this.container = container;
    _this.transitions = transitions;
    _this.fallback = fallback;
    _this.config = config;

    _this.transition = null;
    _this.loading = null;
    _this.el = document.querySelector(_this.container);
    return _this;
  }

  /**
   * Build plugin necessities
   */


  _createClass(Router, [{
    key: 'onInit',
    value: function onInit() {
      var _this2 = this;

      // do not load pjax if browse from local files
      if (location.protocol === 'file:') {
        this.log.error('cannot load PJax on file:// protocol, please setup a web server');
        return;
      }

      // instanciate pjax
      this.pjax = new _pjax2.default({
        selectors: ['title', this.container],
        switches: _defineProperty({}, this.container, function (before, after, opts) {
          return _this2.onSwap(before, after, opts);
        }),
        cacheBust: false
        //debug: this.$modulus.config.debug
      });

      // listen globally for start event
      document.addEventListener('pjax:send', function (e) {
        return _this2.onLoading(e);
      });

      // listen globally for error
      document.addEventListener('pjax:error', function (err) {
        return _this2.onError(err);
      });

      // add initial class on body
      document.body.classList.add('-loaded');
    }

    /**
     * Change url
     * @param {String} url
     * @param {Object} opts
     */

  }, {
    key: 'go',
    value: function go(url, opts) {
      if (this.pjax) this.pjax.loadUrl(url, opts);else location.href = url;
    }

    /**
     * Transition is starting
     * @param {Object} e
     */

  }, {
    key: 'onLoading',
    value: function onLoading(e) {

      // change body classes
      document.body.classList.remove('-loaded');
      document.body.classList.add('-loading');

      // resolve transition name
      var name = null;

      // transition from go() method
      if (e.transition) {
        name = e.transition;
      }
      // transition from element attribute
      else if (e.triggerElement) {
          name = e.triggerElement.dataset.transition;
        }

      // default transition name
      if (!this.transitions[name]) {
        name = this.fallback;
      }

      // get transition by name
      this.transition = this.transitions[name];

      // start transition
      this.log('route change', name);
      this.$emit('route.change', name);
      this.loading = this.transition.enter(this.el); // assume promise
    }

    /**
     * Next page is loaded, replace content
     * @param {HTMLElement} before
     * @param {HTMLElement} after
     * @param {Object} opts
     */

  }, {
    key: 'onSwap',
    value: function onSwap(before, after) {
      var _this3 = this;

      this.loading.then(function () {

        // replace content
        _this3.log('dom destroyed');
        _this3.$emit('dom.destroyed', before);
        before.innerHTML = after.innerHTML;

        // rebuild modulus
        _this3.pjax.onSwitch();
        _this3.$modulus.rebuild(before);

        // end transition
        _this3.onLoaded();
      });
    }

    /**
     * End transition
     */

  }, {
    key: 'onLoaded',
    value: function onLoaded() {
      var _this4 = this;

      // change body classes
      document.body.classList.remove('-loading');
      document.body.classList.add('-loaded');

      // end transition
      this.log('dom updated');
      this.$emit('dom.updated', this.el);
      this.transition.leave(this.el).then(function () {
        _this4.transition = null;
        _this4.loading = null;
      });
    }

    /**
     * Handle request error
     * @param {Object} err 
     */

  }, {
    key: 'onError',
    value: function onError(err) {

      // force redirection in any errors
      this.log.error(err);
      location.href = err.request.responseURL;
    }
  }]);

  return Router;
}(_plugin2.default);

exports.default = Router;
//# sourceMappingURL=router.js.map