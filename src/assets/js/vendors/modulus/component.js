import EventEmitter from 'tiny-emitter'

export default class Component extends EventEmitter {

  /**
   * New Component
   * @param {HTMLElement}   el
   * @param {Object}        opts
   * @param {Object}        opts.attrs - element attributes
   * @param {DOMStringMap}  opts.dataset - element dataset attributes
   * @param {Object}        opts.refs - HTMLElement found by ref
   */
  constructor(el, { attrs, dataset, refs }) {
    super()
    this.el = el
    this.attrs = attrs
    this.dataset = dataset
    this.refs = refs
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
   * Listen to global event bus
   * @param {String} event 
   * @param {Function} callback 
   */
  $on(event, callback) {
    this.$modulus.on(event, (...args) => callback(...args))
  }


  /**
   * Emit to both global and local event bus
   * @param {String} event 
   * @param  {...any} args 
   */
  $emit(event, ...args) {
    this.emit(event, ...args) // local
    this.$modulus.emit(event, ...args) // global
  }

}