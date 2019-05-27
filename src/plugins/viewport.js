import Plugin from '../plugin'
import attrAnim from './viewport/attr-anim'
import attrLazy from './viewport/attr-lazy'

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
      animOffset: '-120px'
    }, config)

    this.attributes = {
      'data-anim': attrAnim,
      'data-src': attrLazy,
    }
  }


  /**
   * Bind plugin necessities
   */
  onInit() {

    // clear observers (@todo reduce scope to root param)
    this.$on('dom.destroyed', root => {
      this.observers.map(o => o.disconnect())
      this.observers = []
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
  observe({ scope, target, once = true, enter = true, leave = false, offset, callback }) {

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

}