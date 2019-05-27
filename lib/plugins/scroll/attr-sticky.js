"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  watch: function watch($scroll, els) {
    for (var i = 0; i < els.length; i++) {
      $scroll.sticky(els[i]);
    }
  },
  clear: function clear($scroll, els) {
    for (var i = 0; i < els.length; i++) {
      $scroll.clearSticky(els[i]);
    }
  }
};
//# sourceMappingURL=attr-sticky.js.map