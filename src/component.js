import EventEmitter from 'tiny-emitter'
import Logger from './logger'

export default class Component extends EventEmitter {

  /**
   * New Component
   * @param {HTMLElement}   el
   * @param {Object}        opts
   * @param {String}        opts.uid - unique id
   * @param {Object}        opts.attrs - element attributes
   * @param {DOMStringMap}  opts.dataset - element dataset attributes
   * @param {Object}        opts.refs - HTMLElement found by `[ref]`
   */
  constructor(el, { uid, attrs, dataset, refs }) {
    super()

    // props
    this.el = el
    this.uid = uid
    this.attrs = attrs
    this.dataset = dataset
    this.refs = refs

    // bind to element
    el.__mod = this

    // instanciate logger
    this.log = new Logger({
      active: this.$modulus.config.debug,
      prefix: `[${uid}]`
    })
  }


  /**
   * Initialize component 
   */
  onInit() {}


  /**
   * Destroy component
   */
  onDestroy() {}


  /**
   * Alias of querySelector()
   * @param {String} selector
   * @return {HTMLElement}
   */
  child(selector) {
    return this.el.querySelector(selector)
  }


  /**
   * Alias of querySelectorAll()
   * @param {String} selector 
   * @return {NodeList}
   */
  children(selector) {
    return this.el.querySelectorAll(selector)
  }


  /**
   * Listen to global event bus
   * @param {String} event 
   * @param {Function} callback 
   */
  $on(event, callback) {
    this.$modulus.on(event, (...args) => callback(...args))
  }


  /**
   * Emit to global event bus
   * @param {String} event 
   * @param  {...any} args 
   */
  $emit(event, ...args) {
    this.$modulus.emit(event, ...args)
  }

}