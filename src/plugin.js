/**
 * Private method: apply observer to attributes
 * @param {Plugin} self 
 * @param {HTMLElement} root 
 */
function watchAttributes($plugin, root = document.body) {
  for(let attr in $plugin.attributes) {
    const els = root.querySelectorAll(`[${attr}]`)
    $plugin.attributes[attr].watch($plugin, els, root)
  }
}


/**
 * Private method: clear observer to attributes
 * @param {Plugin} self 
 * @param {HTMLElement} root 
 */
function clearAttributes($plugin, root = document.body) {
  for(let attr in $plugin.attributes) {
    const els = root.querySelectorAll(`[${attr}]`)
    $plugin.attributes[attr].clear($plugin, els, root)
  }
}


/**
 * Plugin Class
 */
export default class Plugin {

  constructor() {
    this.attributes = {}
  }

  
  /**
   * Setup component before onInit
   */
  onSetup() {
    watchAttributes(this)
    this.$on('dom.destroyed', root => clearAttributes(this, root))
    this.$on('dom.updated', root => watchAttributes(this, root))
  }

  
  /**
   * Initialize component 
   */
  onInit() {}


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
    this.$modulus.emit(event, ...args)
  }

}