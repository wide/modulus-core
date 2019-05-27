'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  watch: function watch($scroll, els) {
    for (var i = 0; i < els.length; i++) {
      els[i].addEventListener('click', function (e) {
        e.stopPropagation();
        $scroll.to(e.target.dataset.scrollto || e.target.href);
        return false;
      });
    }
  },
  clear: function clear() {}
};
//# sourceMappingURL=attr-scroll-to.js.map