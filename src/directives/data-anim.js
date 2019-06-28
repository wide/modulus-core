export default {

  /**
   * Props
   */
  seek: '[data-anim]',


  /**
   * Setup hook, called once
   * @param {Modulus} modulus 
   */
  setup(modulus) {},


  /**
   * Bind directive to element
   * @param {Modulus} modulus 
   * @param {HTMLElement} el 
   * 
   * <div data-anim="fade"                    will add `.fade-enter` and `.fade-leave` on transition
   *      data-anim.when="enter|leave"
   *      data-anim.offset="-100px"
   * >...</div>
   *
   * For JS transition, prefix the name with `@`: `<div data-anim="@fade">`, will call `fade.enter()` and `fade.leave()`
   */
  bind(modulus, el) {

    const viewport = modulus.plugins.viewport

    // get transition name
    let name = el.dataset.anim
    const isJS = name[0] === '@'
    name = isJS ? name.substr(1) : name

    // get transition options
    const when = el.dataset['anim.when'] || ''
    const offset = el.dataset['anim.offset'] || viewport.config.animOffset
    const staggering = el.hasAttribute(`data-anim.stagger`)

    // parse when options
    const opts = {}
    when.split('|').forEach(o => opts[o] = true)

    // create observer
    viewport.observe({
      target: el,
      scope: opts.scope,
      once: opts.once,
      enter: opts.enter,
      leave: opts.leave,
      offset,
      callback(el, entry) {

        // JS transition
        if(isJS) {
          const verb = (entry.isIntersecting) ? 'enter' : 'leave'
          if(viewport.animations[name][verb]) {
            viewport.animations[name][verb](staggering ? el.children : el)
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
  },


  /**
   * Unbind directive from element
   * @param {Modulus} modulus 
   * @param {HTMLElement} el 
   */
  unbind(modulus, el) {}

}