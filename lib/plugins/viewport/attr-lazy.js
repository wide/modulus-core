'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  /**
   * Lazy load img with `data-src` attribute when entering the viewport
   */
  watch: function watch($viewport, els) {
    $viewport.observe({
      target: els,
      once: true, // destroy observer after callback
      offset: '200px', // trigger 200px before entering viewport
      callback: function callback(el) {
        return el.src = el.dataset.src;
      }
    });
  },
  clear: function clear() {}
};
//# sourceMappingURL=attr-lazy.js.map