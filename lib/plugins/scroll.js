'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _bodyScrollLock = require('body-scroll-lock');

var _uos = require('uos');

var _uos2 = _interopRequireDefault(_uos);

var _stickybits = require('stickybits');

var _stickybits2 = _interopRequireDefault(_stickybits);

var _jump = require('jump.js');

var _jump2 = _interopRequireDefault(_jump);

var _attrScrollTo = require('./scroll/attr-scroll-to');

var _attrScrollTo2 = _interopRequireDefault(_attrScrollTo);

var _attrParallax = require('./scroll/attr-parallax');

var _attrParallax2 = _interopRequireDefault(_attrParallax);

var _attrSticky = require('./scroll/attr-sticky');

var _attrSticky2 = _interopRequireDefault(_attrSticky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scroll = function (_Plugin) {
  _inherits(Scroll, _Plugin);

  function Scroll() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        config = _ref.config;

    _classCallCheck(this, Scroll);

    var _this = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this));

    _this.progresses = [];
    _this.stickied = [];
    _this.state = {
      up: false,
      down: false,
      value: 0,
      progress: 0
    };

    _this.config = config;
    _this.attributes = {
      'data-scroll-to': _attrScrollTo2.default,
      'data-parallax': _attrParallax2.default,
      'data-sticky': _attrSticky2.default
    };
    return _this;
  }

  /**
   * Build plugin necessities
   */


  _createClass(Scroll, [{
    key: 'onInit',
    value: function onInit() {
      var _this2 = this;

      // set first state
      this.computeScroll(0);

      // on scroll, recompute
      this.progress(0.0, 1.0, function (progress) {
        _this2.computeScroll(progress);
        _this2.$emit('scroll', _this2.state);
      });
    }

    /**
     * Compute current scroll state
     * @param {Number} progress 
     */

  }, {
    key: 'computeScroll',
    value: function computeScroll(progress) {
      this.state = {
        up: window.scrollY < this.state.value,
        down: window.scrollY > this.state.value,
        value: window.scrollY,
        progress: progress
      };
    }

    /**
     * Scroll to specific element in page
     * @param {HTMLElement|String} target 
     * @para {Object} tops
     */

  }, {
    key: 'to',
    value: function to(target, opts) {
      (0, _jump2.default)(target, opts);
    }

    /**
     * Lock scroll
     * @param {HTMLElement} target
     */

  }, {
    key: 'lock',
    value: function lock(target) {
      document.body.classList.add('-locked');
      document.documentElement.style.overflowY = 'hidden';
      (0, _bodyScrollLock.disableBodyScroll)(target);
    }

    /**
     * Unlock scroll
     */

  }, {
    key: 'unlock',
    value: function unlock() {
      document.body.classList.remove('-locked');
      document.documentElement.style.overflowY = 'scroll';
      (0, _bodyScrollLock.clearAllBodyScrollLocks)();
    }

    /**
     * Trigger a callback on every scroll event between 2 positions
     * @param {Number|String} from position (can be percent: 0.5, or px: 100)
     * @param {Number|String} to position (can be percent: 0.5, or px: 100)
     * @param {Function} callback 
     */

  }, {
    key: 'progress',
    value: function progress(from, to, callback, el) {
      this.progresses.push({
        el: el, callback: callback,
        remove: (0, _uos2.default)(from, to, callback)
      });
    }

    /**
     * Delete progress listeners
     * @param {Function} callback 
     */

  }, {
    key: 'clearProgress',
    value: function clearProgress(callback) {
      var i = this.progresses.findIndex(function (p) {
        return p.callback == callback;
      });
      if (i >= 0) this.progresses[i].remove();
    }

    /**
     * Add parallax effect on element depending on the scroll value
     * @param {HTMLElement} el 
     * @param {Float} coef 
     */

  }, {
    key: 'parallax',
    value: function parallax(el) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$coef = _ref2.coef,
          coef = _ref2$coef === undefined ? .4 : _ref2$coef,
          _ref2$axis = _ref2.axis,
          axis = _ref2$axis === undefined ? 'Y' : _ref2$axis;

      var bodyRect = document.body.getBoundingClientRect();
      var rect = el.getBoundingClientRect();

      // compute boudings
      var offsetTop = rect.top - bodyRect.top;
      var boundStart = offsetTop - window.innerHeight;
      var boundEnd = offsetTop + rect.height;

      // resolve axis
      var _axis = axis.toUpperCase();
      var _sign = '';

      // reverse direction
      if (_axis[0] === '-') {
        _sign = '-';
        _axis = _axis.substr(1);
      }

      this.progress(boundStart, boundEnd, function (progress) {
        el.style.transform = 'translateZ(0) translate' + _axis + '(' + _sign + progress * (100 * coef) + '%)';
      }, el);
    }

    /**
     * Clear parallax listeners
     * @param {HTMLElement} el 
     */

  }, {
    key: 'clearParallax',
    value: function clearParallax(el) {
      var i = this.progresses.findIndex(function (p) {
        return p.el == el;
      });
      if (i >= 0) this.progresses[i].remove();
    }

    /**
     * Set element sticky when entering parent viewport
     * @param {HTMLElement} el 
     */

  }, {
    key: 'sticky',
    value: function sticky(el) {
      this.stickied.push({
        el: el, instance: (0, _stickybits2.default)(el, {
          stickyBitStickyOffset: parseInt(el.dataset['sticky.offset']) || 0,
          useStickyClasses: true,
          parentClass: '-sticky-parent',
          stickyClass: '-sticky',
          stuckClass: '-sticky-stuck',
          stickyChangeClass: '-sticky'
        })
      });
    }

    /**
     * Clear sticky handler for an element
     * @param {HTMLElement} el 
     */

  }, {
    key: 'clearSticky',
    value: function clearSticky(el) {
      var i = this.stickied.findIndex(function (a) {
        return a.el == el;
      });
      if (i >= 0) this.stickied[i].instance.cleanup();
    }
  }]);

  return Scroll;
}(_plugin2.default);

exports.default = Scroll;
//# sourceMappingURL=scroll.js.map