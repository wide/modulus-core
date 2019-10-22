import EventEmitter from 'tiny-emitter'
import Logger from './logger'
import { getUID, getAttrs } from './utils/html'
import { getChildrenByAttr } from './utils/dom'

export default class Component extends EventEmitter {

  /**
   * New Component
   * @param {HTMLElement}   el
   */
  constructor(el) {
    super()

    // props
    this.el = el
    this.uid = getUID(el)
    this.dataset = el.dataset
    this.attrs = getAttrs(el)
    this.refs = getChildrenByAttr(el, 'ref')

    // bind to element
    el.__mod = this

    // instanciate logger
    this.log = new Logger({
      active: () => this.$modulus.config.debug,
      prefix: `<${this.uid}>`
    })
  }


  /**
   * Setup component once
   * @param {Modulus} modulus
   */
  static onSetup(modulus) {}


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


  /**
   * Create component programatically
   * @param {HTMLElement} el
   */
  static create(el, ...args) {
    const instance = new this(el)
    instance.onInit(...args)
    return instance
  }

}