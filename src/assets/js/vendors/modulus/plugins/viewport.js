import callbacks from './viewport/callbacks'

export default class Viewport {


  /**
   * New viewport plugin
   * @param {Object} opts
   * @param {Object} opts.config
   * @param {Object} opts.animations list of JS animations
   */
  constructor({ config, animations }) {

    this.observers = []
    this.defaultAnimModifiers = ['enter']

    this.animations = animations
    this.config = Object.assign({ animAttribute: 'data-viewport-anim' }, config)
  }


  /**
   * Bind instance to modulus
   * @param {Modulus} modulus 
   * @param {Component} Component 
   */
  onInstall(modulus, Component) {
    modulus.$viewport = Component.prototype.$viewport = this
    this.observeByAttr()
  }


  /**
   * Automatically observe `data-viewport-anim` attribute
   * 
   * CSS Animations :
   * - `[data-viewport-anim="fade"]` will add `.fade-enter` and `.fade-leave` when entering/leaving viewport
   * - `[data-viewport-anim="fade:enter"]` will add `.fade-enter` when entering viewport only
   * - `[data-viewport-anim="fade:enter,once"]` will add `.fade-enter` when entering viewport one time only
   * 
   * JS Animations :
   * - `[data-viewport-anim="@fade"]` will call `fade.enter()` and `fade.leave()` when entering/leaving viewport
   * - `[data-viewport-anim="@fade:enter"]` will call `fade.enter()` when entering viewport only
   * - `[data-viewport-anim="@fade:enter,once"]` will call `fade.enter()` when entering viewport one time only
   */
  observeByAttr() {

    // get transitionable elements
    const els = document.querySelectorAll(`[${this.config.animAttribute}]`)
    for(let i = 0; i < els.length; i++) {

      // parse name and modifiers
      const [_name, _modifiers] = els[i].getAttribute(this.config.animAttribute).split(':')
      const jsAnimation = (_name[0] === '@')
      const name = jsAnimation ? _name.substr(1) : _name
      const modifiers = _modifiers ? _modifiers.split(',') : this.defaultAnimModifiers

      // create observer
      this.observe({
        target: els[i],
        enter: modifiers.includes('enter'),
        leave: modifiers.includes('leave'),
        once: modifiers.includes('once'),
        callback: jsAnimation
          ? callbacks.jsAnimation(name, this.animations)
          : callbacks.cssAnimation(name)
      })
    }

  }


  /**
   * Observe an element when it intersects in the viewport
   * @param {Object}                opts 
   * @param {HTMLElement}           opts.scope      parent element to set the scope
   * @param {HTMLElement|NodeList}  opts.target     element(s) to observe in the scope
   * @param {Boolean}               opts.once       trigger only once and destroy the listener
   * @param {Boolean}               opts.enter      trigger only when the element appears
   * @param {Boolean}               opts.leave      trigger only when the element disappears
   * @param {Function}              opts.callback   action to call
   */
  observe({ scope, target, once = false, enter = true, leave = false, callback }) {

    // keep track of element entering at least once
    let hasEntered = false

    // create viewport observer
    const observer = new IntersectionObserver(entries => {

      // for all observed elements
      for(let i in entries) {

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
    }, { root: scope })

    // start to observe element(s)
    const els = (target instanceof NodeList) ? target : [target]
    for(let i = 0; i < els.length; i++) observer.observe(els[i])

    // register observer for futur destruction
    this.observers.push(observer)
    return observer
  }


  /**
   * Affix an element in a parent: fixed to absolute
   * @param {Object}                opts 
   * @param {HTMLElement}           opts.scope 
   * @param {HTMLElement|NodeList}  opts.target 
   * @param {Integer}               opts.offset 
   * @param {String}                opts.topClass 
   * @param {String}                opts.bottomClass 
   * @param {Function}              opts.callback 
   */
  affix({ scope, target, offset, topClass, bottomClass, callback }) {
    // @todo
  }


  /**
   * Listen parent's scroll and give information to element on value, ratio and direction
   * @param {Object}                opts 
   * @param {HTMLElement}           opts.scope 
   * @param {HTMLElement|NodeList}  opts.target 
   * @param {Function}              opts.callback 
   */
  scroll({ scope, target, callback }) {
    // @todo
  }


  /**
   * Donnect and destroy running observers
   */
  onDestroy() {
    for(let i in this.observers) {
      this.observers[i].disconnect()
    }
    this.observers = []
  }

}