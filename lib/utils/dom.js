'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slideUp = slideUp;
exports.slideDown = slideDown;
exports.slideToggle = slideToggle;
exports.animate = animate;
exports.animateFrom = animateFrom;

var _TweenLite = require('gsap/TweenLite');

var _TweenLite2 = _interopRequireDefault(_TweenLite);

var _TimelineLite = require('gsap/TimelineLite');

var _TimelineLite2 = _interopRequireDefault(_TimelineLite);

require('gsap/CSSPlugin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_DURATION = 400;
var DEFAULT_STAGGER = 40;

/**
 * Hide element with slide effect bottom to top
 * @param {HTMLElement} el
 * @param {Number} duration ms
 * @return {Promise}
 */
function slideUp(el) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_DURATION;

  return new Promise(function (onComplete) {
    _TweenLite2.default.set(el, { overflow: 'hidden' });
    _TweenLite2.default.to(el, duration / 1000, { height: 0, display: 'none', onComplete: onComplete });
  });
}

/**
 * Show element with slide effect top to bottom
 * @param {HTMLElement} el
 * @param {Number} duration ms
 * @return {Promise}
 */
function slideDown(el) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_DURATION;

  return new Promise(function (onComplete) {
    _TweenLite2.default.set(el, { overflow: 'hidden', height: 'auto', display: 'block' });
    _TweenLite2.default.from(el, duration / 1000, { height: 0, onComplete: onComplete });
  });
}

/**
 * Hide or shor element with slide effect
 * @param {HTMLElement} el
 * @param {Number} duration ms
 * @returns {Promise}
 */
function slideToggle(el) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_DURATION;

  return window.getComputedStyle(el).display === 'none' ? slideDown(el, duration) : slideUp(el, duration);
}

/**
 * Animate elements
 * @param {HTMLElement|NodeList} els 
 * @param {Object} to 
 * @param {Number} duration 
 * @param {Number} stagger 
 * @return {Promise}
 */
function animate(els, to) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_DURATION;
  var stagger = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_STAGGER;

  return new Promise(function (onComplete) {
    var target = Number.isInteger(els.length) ? els : [els];
    new _TimelineLite2.default({ onComplete: onComplete }).staggerTo(target, duration / 1000, to, stagger / 1000);
  });
}

/**
 * Animate elements from specific props
 * @param {HTMLElement|NodeList} els 
 * @param {Object} from
 * @param {Object} to 
 * @param {Number} duration 
 * @param {Number} stagger 
 * @return {Promise}
 */
function animateFrom(els, from, to) {
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_DURATION;
  var stagger = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : DEFAULT_STAGGER;

  return new Promise(function (onComplete) {
    var target = Number.isInteger(els.length) ? els : [els];
    new _TimelineLite2.default({ onComplete: onComplete }).staggerFromTo(target, duration / 1000, from, to, stagger / 1000);
  });
}
//# sourceMappingURL=dom.js.map