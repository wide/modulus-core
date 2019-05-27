'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  /**
   * Observe `data-anim` attribute
   * @param {Viewport} $viewport
   *
   * <div data-anim="fade"                    will add `.fade-enter` and `.fade-leave` on transition
   *      data-anim.when="enter|leave"
   *      data-anim.offset="-100px"
   * >...</div>
   *
   * For JS transition, prefix the name with `@`: `<div data-anim="@fade">`, will call `fade.enter()` and `fade.leave()`
   */
  watch: function watch($viewport, els) {
    var _loop = function _loop(i) {

      // get transition name
      var name = els[i].dataset.anim;
      var isJS = name[0] === '@';
      name = isJS ? name.substr(1) : name;

      // get transition options
      var when = els[i].dataset['anim.when'] || '';
      var offset = els[i].dataset['anim.offset'] || $viewport.config.animOffset;
      var staggering = els[i].hasAttribute('data-anim.stagger');

      // parse when options
      var opts = {};
      when.split('|').forEach(function (o) {
        return opts[o] = true;
      });

      // create observer
      $viewport.observe({
        target: els[i],
        scope: opts.scope,
        once: opts.once,
        enter: opts.enter,
        leave: opts.leave,
        offset: offset,
        callback: function callback(el, entry) {

          // JS transition
          if (isJS) {
            var verb = entry.isIntersecting ? 'enter' : 'leave';
            if ($viewport.animations[name][verb]) {
              $viewport.animations[name][verb](staggering ? el.children : el);
            }
          }
          // CSS transition
          else {
              if (entry.isIntersecting) {
                el.classList.remove(name + '-leave');
                el.classList.add(name + '-enter');
              } else {
                el.classList.remove(name + '-enter');
                el.classList.add(name + '-leave');
              }
            }
        }
      });
    };

    for (var i = 0; i < els.length; i++) {
      _loop(i);
    }
  },
  clear: function clear() {}
};
//# sourceMappingURL=attr-anim.js.map