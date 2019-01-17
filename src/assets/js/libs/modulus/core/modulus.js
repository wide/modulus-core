import EventDispatcher from './event-dispatcher'
import Module from './module'

export default class Modulus extends EventDispatcher {

  constructor(config, plugins, modules) {

    // set options
    super()
    this.config = Object.assign({ debug: false }, config)
    this.log(null, 'start', this.config)

    // register plugins
    this.plugins = {}
    this.registerPlugins(plugins)

    // parse document
    this.instances = {}
    this.modules = modules
    document.addEventListener('DOMContentLoaded', e => this.parseDocument())
  }


  /**
   * Log message in console
   * @param {Module} mod 
   * @param  {...any} args 
   */
  log(mod, ...args) {
    if(!this.config.debug) return;
    if(mod instanceof Module) {
      console.log(`Modulus@${mod.$uid}:`, ...args)
    }
    else console.log(`Modulus:`, ...args)
  }


  /**
   * Add plugins and allow them to modify Module prototype
   * @param {Collection} plugins 
   */
  registerPlugins(plugins) {
    for(let name in plugins) {
      this.log(null, `plug [${name}]`)
      this.plugins[name] = plugins[name](Module, Modulus)
    }
  }


  /**
   * Parse document and instanciate all modules
   * @return {Module}
   */
  parseDocument() {

    // lookup all `data-mod` attributes
    this.log(null, `parse document`)
    document.querySelectorAll(`[data-mod]`).forEach(el => {

      // seek related module class
      const name = el.getAttribute('data-mod')
      const ModuleClass = this.modules[name]
      if(ModuleClass) {

        // register module instance
        this.instances[name] = this.instances[name] || []
        const instance = this.instanciateModule(name, ModuleClass, el)
        this.instances[name].push(instance)
        
        // trigger `onInit` module hook
        if(instance instanceof Module) {
          instance.onInit()
        }
      }
      else console.error(`unknown module [${name}]`)
    })

    // dispatch `ready` event to all modules
    this.log(null, `ready!`)
    this.emit(null, 'ready')
  }


  /**
   * Instance module and bind related data
   * @param {String} name 
   * @param {Class} ModuleClass 
   * @param {HTMLElement} el 
   */
  instanciateModule(name, ModuleClass, el) {

    // parse attributes and data-attributes
    const attrs = {}
    Array.from(el.attributes).forEach(attr => attrs[attr] = el.getAttribute(attr))

    // instanciate module object with attributes
    const instance = new ModuleClass(el, attrs, el.dataset)

    // bind identity data to instance
    instance.$name = name
    instance.$uid = `${name}_${this.instances[name].length}`

    // bind modulus to instance (needed for event dispatching)
    instance.$modulus = this

    // bind instance to element
    el.$module = instance

    return instance
  }


  /**
   * Shorthand constructor
   * @param {Object} opts 
   */
  static boot(opts = {}) {
    return new Modulus(opts.config, opts.plugins, opts.modules)
  }

}