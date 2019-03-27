import EventEmitter from 'tiny-emitter'
import Component from './component'
import Logger from './logger'


function deepCall(collection, method, deeper = false) {
  for(let name in collection) {
    if(deeper) deepCall(collection[name], method)
    else if(collection[name][method]) collection[name][method]()
  }
}


export default class Modulus extends EventEmitter {


  /**
   * New Modulus instance
   * @param {Object} opts 
   * @param {Object}  opts.config
   * @param {Object}  opts.plugins - list of plugins to register
   * @param {Object}  opts.masters - list of global components to register
   * @param {Object}  opts.components - list of regular components to register
   * @param {Object}  opts.webComponents - list of web components to register
   */
  constructor({ config = {}, plugins = {}, masters = {}, components = {}, webComponents = {} }) {

    super()

    // catalog of available classes
    this._plugins = plugins
    this._masters = masters
    this._components = components
    this._webComponents = webComponents

    // catalog of instances
    this.plugins = {}
    this.masters = {}
    this.components = {}
    this.webComponents = {}
    this.ready = false

    this.config = Object.assign({
      debug: false,
      seekAttribute: 'data-mod'
    }, config)

    this.log = new Logger({ active: this.config.debug, prefix: '' })
    this.log(`Modulus start (${process.env.PRODUCTION ? 'PROD' : 'DEV'} mode)`)

    document.addEventListener('DOMContentLoaded', e => this.build())
  }


  /**
   * Build plugins, master and components
   */
  build() {
    this.registerPlugins()
    this.initPlugins()
    this.registerMasters()
    this.initMasters()
    this.registerComponents()
    this.initComponents()
    this.registerCustomElements()
  }


  /**
   * Destroy plugins, masters and components
   */
  destroy() {
    this.destroyPlugins()
    this.destroyMasters()
    this.destroyComponents()
    this.components = {}
  }


  /**
   * Rebuild plugins, masters and components
   */
  rebuild() {
    this.initPlugins()
    this.initMasters()
    this.registerComponents()
    this.initComponents()
  }


  /**
   * Add plugins
   * @param {Object} plugins 
   */
  registerPlugins() {
    for(let name in this._plugins) {

      // attach plugin to modulus and vice-versa
      this.plugins[name] = this._plugins[name]
      this.plugins[name].$modulus = this

      // attach plugin to Component class
      Component.prototype[`$${name}`] = this.plugins[name]

      this.log(`- plugin [${name}] registered`)
    }
  }


  /**
   * Run onInit on all plugins
   */
  initPlugins() {
    deepCall(this.plugins, 'onInit')
  }


  /**
   * Run onDestroy on all plugins
   */
  destroyPlugins() {
    deepCall(this.plugins, 'onDestroy')
  }


  /**
   * Register master components
   */
  registerMasters() {
    for(let name in this._masters) {
      this.masters[name] = this.instanciateComponent(name, this._masters[name], document.body, true)
      this.log(`- master [${name}] registered`)
    }
  }


  /**
   * Run onInit on all masters
   */
  initMasters() {
    deepCall(this.masters, 'onInit')
  }


  /**
   * Run onDestroy on all masters
   */
  destroyMasters() {
    deepCall(this.masters, 'onDestroy')
  }


  /**
   * Parse document and instanciate all components in [data-mod] attributes
   */
  registerComponents() {
    const els = document.querySelectorAll(`[${this.config.seekAttribute}]`)
    for(let i = 0; i < els.length; i++) {

      // seek related module class
      const name = els[i].getAttribute(this.config.seekAttribute)
      const ComponentClass = this._components[name]

      // register component instance
      if(ComponentClass) {

        // new regular component
        const instance = this.instanciateComponent(name, ComponentClass, els[i])
        this.log(`- component [${instance.$uid}] registered`)

        // detached from DOM
        this.observeDestruction(els[i])
      }
      else this.log.error(`Unknown component [${name}]`)
    }
  }


  /**
   * Create mutation observe for DOM removal event
   * @param {HTMLElement} el 
   */
  observeDestruction(el) {
    const parent = el.parentElement
    const mut = new MutationObserver(e => {
      if(!parent.contains(el) && el.$component.onDestroy) {
        el.$component.onDestroy()
      }
    })
    mut.observe(parent, { childList: true })
  }


  /**
   * Run onInit on regular components
   */
  initComponents() {
    deepCall(this.components, 'onInit', true)
  }


  /**
   * Run onDestroy on all components
   */
  destroyComponents() {
    deepCall(this.components, 'onDestroy', true)
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
            self.instanciateComponent(name, ComponentClass, this)
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
   * @return {Component}
   */
  instanciateComponent(name, ComponentClass, el, isMaster) {

    // resolve registry
    const registry = isMaster ? 'masters' : 'components'

    // create new entry for component name
    this[registry][name] = this[registry][name] || []

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
      refs[ref] = els[i].$component || els[i]
    }

    // instanciate component object with attributes
    const instance = new ComponentClass(el, { attrs, refs, dataset: el.dataset })

    // bind identity data to instance
    instance.$uid = (isMaster) ? name : `${name}#${el.id || this[registry][name].length}`

    // bind logger to instance
    instance.log = new Logger({ active: this.config.debug, prefix: `[${instance.$uid}]` })

    // bind modulus to instance (needed for event dispatching)
    instance.$modulus = this

    // bind instance to element
    el.$component = instance

    // add instance to registry
    this[registry][name].push(instance)

    return instance
  }

}