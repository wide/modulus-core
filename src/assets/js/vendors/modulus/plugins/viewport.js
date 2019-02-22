export default class Viewport {

  constructor() {
    this.observers = []
  }


  /**
   * Bind instance to modulus
   * @param {Modulus} modulus 
   * @param {Component} Component 
   */
  onInstall(modulus, Component) {
    modulus.$viewport = Component.prototype.$viewport = this
  }


  /**
   * Observe an element when it appears in the viewport
   * @param {Object}                opts 
   * @param {HTMLElement}           opts.scope 
   * @param {HTMLElement|NodeList}  opts.target 
   * @param {Boolean}               opts.once 
   * @param {Function}              opts.callback 
   */
  observe({ scope, target, once, callback }) {

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) { // avoid first call
          callback(entry.target, entry)
          if(once) observer.unobserve(entry.target)
        }
      })
    }, { root: scope })

    const els = (target.forEach) ? target : [target]
    els.forEach(node => observer.observe(node))

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
   * Destroy all observers and listeners
   */
  onDestroy() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }

}