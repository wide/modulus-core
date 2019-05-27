'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _customEvent = require('../../utils/custom-event');

var _customEvent2 = _interopRequireDefault(_customEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  watch: function watch($scroll, els) {
    for (var i = 0; i < els.length; i++) {
      $scroll.parallax(els[i], {
        coef: parseFloat(els[i].dataset.parallax) || undefined,
        axis: els[i].dataset['parallax.axis'] || undefined
      });
    }
    window.dispatchEvent(new _customEvent2.default('scroll'));
  },
  clear: function clear($scroll, els) {
    for (var i = 0; i < els.length; i++) {
      $scroll.clearParallax(els[i]);
    }
  }
};
//# sourceMappingURL=attr-parallax.js.map