import Plugin from 'modulus/plugin'

export default class Viewport extends Plugin {

  /**
   * New viewport plugin
   * @param {Object} opts
   * @param {Object} opts.config
   * @param {Object} opts.animations list of JS animations
   */
  constructor({ config, animations }) {
    super()

    this.observers = []
    this.animations = animations

    this.config = Object.assign({
      animAttribute: 'data-anim',
      animOffset: '-120px',
      srcAttribute: 'data-src'
    }, config)
  }


  /**
   * Bind plugin necessities
   */
  onInit() {

    this._observeAnimAttrs()
    this._observeLazySrcAttrs()

    this.$on('route.destroy', root => {
      this.observers.map(o => o.disconnect())
      this.observers = []
    })

    this.$on('route.loaded', root => {
      this._observeAnimAttrs(root)
      this._observeLazySrcAttrs(root)
    })
  }


  /**
   * Observe an element when it intersects in the viewport
   * @param {Object}                opts 
   * @param {HTMLElement}           opts.scope      parent element to set the scope
   * @param {HTMLElement|NodeList}  opts.target     element(s) to observe in the scope
   * @param {Boolean}               opts.once       trigger only once and destroy the listener
   * @param {Boolean}               opts.enter      trigger only when the element appears
   * @param {Boolean}               opts.leave      trigger only when the element disappears
   * @param {String}                opts.offset     margin around scope to defer trigger
   * @param {Function}              opts.callback   action to call
   */
  observe({ scope, target, once = false, enter = true, leave = false, offset, callback }) {

    // keep track of element entering at least once
    let hasEntered = false

    // create viewport observer
    const observer = new IntersectionObserver(entries => {

      // for all observed elements
      for(let i = 0; i < entries.length; i++) {

        // process if :
        // - `enter` is specified and element is entering the viewport
        // - `leave` is specified and element is leaving after entering at least once
        if((enter && entries[i].isIntersecting) || (hasEntered && leave && !entries[i].isIntersecting)) {
          
          // set element has entered once
          if(enter && !hasEntered) hasEntered = true

          // call the action, give the element as first param
          callback(entries[i].target, entries[i])

          // unobserve if the `once` is specifies
          if(once) observer.unobserve(entries[i].target)
        }
      }
    }, { root: scope, rootMargin: offset })

    // start to observe element(s)
    const els = (target instanceof NodeList) ? target : [target]
    for(let i = 0; i < els.length; i++) observer.observe(els[i])

    // register observer for futur destruction
    this.observers.push(observer)
    return observer
  }


  /**
   * Observe `data-anim` attribute
   * @param {Viewport} viewport
   * 
   * <div data-anim="fade"                    will add `.fade-enter` and `.fade-leave` on transition
   *      data-anim.when="enter|leave"
   *      data-anim.offset="-100px"
   * >...</div>
   * 
   * For JS transition, prefix the name with `@`: `<div data-anim="@fade">`, will call `fade.enter()` and `fade.leave()`
   */
  _observeAnimAttrs(root = document.body) {

    // get transitionable elements
    const els = root.querySelectorAll(`[${this.config.animAttribute}]`)
    for(let i = 0; i < els.length; i++) {

      // get transition name
      let name = els[i].getAttribute(this.config.animAttribute)
      const isJS = name[0] === '@'
      name = isJS ? name.substr(1) : name

      // get transition options
      const when = els[i].getAttribute(`${this.config.animAttribute}.when`) || ''
      const offset = els[i].getAttribute(`${this.config.animAttribute}.offset`) || this.config.animOffset

      // parse when options
      const opts = {}
      when.split('|').forEach(o => opts[o] = true)

      // create observer
      this.observe({
        target: els[i],
        ...opts,
        offset,
        callback(el, entry) {

          // JS transition
          if(isJS) {
            const verb = (entry.isIntersecting) ? 'enter' : 'leave'
            if(this.animations[name][verb]) {
              this.animations[name][verb](el)
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

  }


  /**
   * Lazy load img with `data-src` attribute when entering the viewport
   */
  _observeLazySrcAttrs() {
    this.observe({
      target: document.querySelectorAll(`img[${this.srcAttribute}]`),
      once: true, // destroy observer after callback
      offset: '200px', // trigger 200px before entering viewport
      callback: el => el.src = el.getAttribute(this.srcAttribute)
    })
  }

}