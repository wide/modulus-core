export default {

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
  watch($viewport, els) {
    for(let i = 0; i < els.length; i++) {
  
      // get transition name
      let name = els[i].dataset.anim
      const isJS = name[0] === '@'
      name = isJS ? name.substr(1) : name
  
      // get transition options
      const when = els[i].dataset['anim.when'] || ''
      const offset = els[i].dataset['anim.offset'] || $viewport.config.animOffset
      const staggering = els[i].hasAttribute(`data-anim.stagger`)
  
      // parse when options
      const opts = {}
      when.split('|').forEach(o => opts[o] = true)
  
      // create observer
      $viewport.observe({
        target: els[i],
        ...opts,
        offset,
        callback(el, entry) {
  
          // JS transition
          if(isJS) {
            const verb = (entry.isIntersecting) ? 'enter' : 'leave'
            if($viewport.animations[name][verb]) {
              $viewport.animations[name][verb](staggering ? el.children : el)
            }
          }
          // CSS transition
          else {
            if(entry.isIntersecting) {
              el.classList.remove(`${name}-leave`)
              el.classList.add(`${name}-enter`)
            }
            else {
              el.classList.remove(`${name}-enter`)
              el.classList.add(`${name}-leave`)
            }
          }
  
        }
      })
    }
  },

  clear() {}

}