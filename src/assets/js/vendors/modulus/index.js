import EventEmitter from 'tiny-emitter'
import Component from './component'
import Logger from './logger'
import { randomHash } from '~/utils/string'

export default class Modulus extends EventEmitter {


  /**
   * New Modulus instance
   * @param {Object} opts 
   * @param {Object}  opts.config
   * @param {Object}  opts.plugins - list of plugins to register
   * @param {Object}  opts.controllers - list of controller to register
   * @param {Object}  opts.components - list of regular components to register
   * @param {Object}  opts.webComponents - list of web components to register
   */
  constructor({ config = {}, plugins = {}, controllers = {}, components = {}, webComponents = {} }) {

    super()

    // catalog of available classes
    this._plugins = plugins
    this._controllers = controllers
    this._components = components
    this._webComponents = webComponents

    // catalog of instances
    this.plugins = {}
    this.controllers = {}
    this.components = {}
    this.webComponents = {}
    this.ready = false

    // assign config
    this.config = Object.assign({
      debug: false,
      expose: false,
      seekAttribute: 'data-mod'
    }, config)

    // assign logger
    this.log = new Logger({ active: this.config.debug, prefix: '' })

    // assign itself to window object if expose requested
    if(this.config.expose) {
      window.$mod = this
    }

    // start parsing
    this.log(`Modulus start (${process.env.PRODUCTION ? 'PROD' : 'DEV'} mode)`)
    document.addEventListener('DOMContentLoaded', e => this.build())
  }


  /**
   * Build plugins, controller and components
   */
  build() {
    this.registerPlugins()
    this.registerControllers()
    this.registerComponents()
    this.initComponents()
    this.registerCustomElements()
    this.observeDestruction()
    this.emit('ready')
  }


  /**
   * Rebuild components
   * @param {HTMLElement} root
   */
  rebuild(root) {
    this.registerComponents(root)
    this.initComponents()
    this.emit('ready')
  }


  /**
   * Add plugins
   */
  registerPlugins() {
    for(let name in this._plugins) {

      // attach plugin to modulus and vice-versa
      this.plugins[name] = this._plugins[name]
      this.plugins[name].$modulus = this
      this.plugins[name].log = new Logger({
        active: this.config.debug,
        prefix: `<${name}>`
      })

      // attach plugin to Component class
      Component.prototype[`$${name}`] = this.plugins[name]

      // init plugin
      this.log(`- plugin <${name}> registered`)
      if(this.plugins[name].onInit) this.plugins[name].onInit()
    }
  }


  /**
   * Register controller components
   */
  registerControllers() {
    for(let name in this._controllers) {

      // instanciate controller component
      this.controllers[name] = this.instanciateComponent(name, this._controllers[name], document.body, true)

      // init controller
      this.log(`- controller [${name}] registered`)
      if(this.controllers[name].onInit) this.controllers[name].onInit()
    }
  }


  /**
   * Parse document and instanciate all components in [data-mod] attributes
   * @param {HTMLElement} root
   */
  registerComponents(root = document.body) {
    const els = root.querySelectorAll(`[${this.config.seekAttribute}]`)
    for(let i = 0; i < els.length; i++) {

      // seek related module class
      const name = els[i].getAttribute(this.config.seekAttribute)
      const ComponentClass = this._components[name]

      // register component instance
      if(ComponentClass) {

        // new regular component
        const instance = this.instanciateComponent(name, ComponentClass, els[i])
        this.components[instance.$uid] = instance
        this.log(`- component [${instance.$uid}] registered`)
      }
      else this.log.error(`Unknown component [${name}]`)
    }
  }


  /**
   * Observe component removal from DOM
   */
  observeDestruction() {
    new MutationObserver(e => {

      for(let uid in this.components) {
        const el = this.components[uid].el
        if(!document.body.contains(el)) {
          if(this.components[uid].onDestroy) {
            this.components[uid].onDestroy()
          }
          delete this.components[uid]
        }
      }

    }).observe(document.body, { childList: true, subtree: true })
  }


  /**
   * Run onInit on regular components
   */
  initComponents() {
    for(let uid in this.components) {
      if(this.components[uid].onInit && !this.components[uid].__initialized) {
        this.components[uid].onInit()
        this.components[uid].__initialized = true
      }
    }
  }


  /**
   * Register components as native custom elements
   */
  registerCustomElements() {
    for(let name in this._webComponents) {

      try {

        // hyphenize tag name (FooBar -> foo-bar)
        let tagname = name.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
        if(tagname[0] === '-') tagname = tagname.substr(1)

        // attach modulus instance to component
        const ComponentClass = this._webComponents[name]
        ComponentClass.prototype.$modulus = this

        // register to custom elements registry
        const self = this
        this.log(`Custom Element [${tagname}] registered`)
        window.customElements.define(tagname, class extends HTMLElement {

          // new web component
          constructor() {
            super()
            const instance = self.instanciateComponent(name, ComponentClass, this)
            self.components[instance.$uid] = instance
          }

          // attached to DOM
          connectedCallback() {
            if(this.$component.onInit) this.$component.onInit()
            if(self.ready && this.$component.onReady) this.$component.onReady()
          }

          // detached from DOM
          disconnectedCallback() {
            if(this.$component.onDestroy) this.$component.onDestroy()
          }

        })
      }
      catch(err) {
        this.log.error(err)
        continue
      }

    }
  }


  /**
   * Instance component and bind related data
   * @param {String} name 
   * @param {Component} ModuleClass 
   * @param {HTMLElement} el 
   * @param {Boolean} unique 
   * @return {Component}
   */
  instanciateComponent(name, ComponentClass, el, unique = false) {

    // parse attributes and data-attributes
    const attrs = {}
    for(let i = 0; i < el.attributes.length; i++) {
      attrs[el.attributes[i]] = el.getAttribute(el.attributes[i])
    }

    // lookup [ref] children
    const refs = {}
    const els = Array.from(el.querySelectorAll(`*:not([${this.config.seekAttribute}]) [ref]`))
    els.concat(...Array.from(el.children).filter(child => child.hasAttribute('ref'))) // ie11 fix for direct child ref
    for(let i = 0; i < els.length; i++) {
      const ref = els[i].getAttribute('ref')
      refs[ref] = els[i]
    }

    // instanciate component object with attributes
    const instance = new ComponentClass(el, { attrs, refs, dataset: el.dataset })

    // bind identity data to instance
    instance.$uid = (unique) ? name : `${name}#${el.id || randomHash()}`

    // bind logger to instance
    instance.log = new Logger({ active: this.config.debug, prefix: `[${instance.$uid}]` })

    // bind modulus to instance (needed for event dispatching)
    instance.$modulus = this

    // bind instance to element
    el.$component = instance

    return instance
  }


  /**
   * Get component by uid
   * @param {String} uid 
   * @return {Component}
   */
  get(uid) {
    return this.components[uid]
  }

}