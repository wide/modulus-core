import callbacks from './viewport/callbacks'

export default class Viewport {


  /**
   * New viewport plugin
   */
  constructor() {
    this.observers = []
    this.defaultModifiers = ['enter']
  }


  /**
   * Bind instance to modulus
   * @param {Modulus} modulus 
   * @param {Component} Component 
   */
  onInstall(modulus, Component) {
    modulus.$viewport = Component.prototype.$viewport = this
    this.autoObserve()
  }


  /**
   * Automatically observe `data-viewport-transition` attribute
   * and generate css class based on the attribute value.
   * 
   * Ex. `[data-viewport-transition="fade"]` will add `.fade-enter` and `.fade-leave"` when entering/leaving viewport
   */
  autoObserve() {

    // get transitionable elements
    const els = document.querySelectorAll('[data-viewport-transition]')
    for(let i = 0; i < els.length; i++) {

      // extract modifiers
      const [name, _modifiers] = els[i].dataset.viewportTransition.split(':')
      const modifiers = _modifiers ? _modifiers.split(',') : this.defaultModifiers

      // create observer
      this.observe({
        target: els[i],
        enter: modifiers.includes('enter'),
        leave: modifiers.includes('leave'),
        once: modifiers.includes('once'),
        callback: callbacks.enterLeaveTransition(name)
      })
    }

  }


  /**
   * Observe an element when it appears in the viewport
   * @param {Object}                opts 
   * @param {HTMLElement}           opts.scope 
   * @param {HTMLElement|NodeList}  opts.target 
   * @param {Boolean}               opts.once 
   * @param {Boolean}               opts.enter 
   * @param {Boolean}               opts.leave 
   * @param {Function}              opts.callback 
   */
  observe({ scope, target, once = false, enter = true, leave = false, callback }) {

    let hasEntered = false

    // create viewport observer
    const observer = new IntersectionObserver(entries => {
      for(let i in entries) {
        if((enter && entries[i].isIntersecting) || (hasEntered && leave && !entries[i].isIntersecting)) {
          if(enter) hasEntered = true
          callback(entries[i].target, entries[i])
          if(once) observer.unobserve(entries[i].target)
        }
      }
    }, { root: scope })

    // attach target to observer
    const els = (target instanceof NodeList) ? target : [target]
    for(let i = 0; i < els.length; i++) {
      observer.observe(els[i])
    }

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