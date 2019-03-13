import EventEmitter from 'tiny-emitter'
import Component from './component'
import Logger from './logger'

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
  constructor({ config, plugins, masters, components, webComponents }) {

    super()

    this.plugins = {}
    this.instances = {}
    this.masters = masters || {}
    this.components = components || {}
    this.webComponents = webComponents || {}
    this.ready = false

    this.config = Object.assign({
      debug: false,
      seekAttribute: 'data-mod'
    }, config)

    this.log = new Logger({ active: this.config.debug, prefix: '' })

    this.log(`Modulus start (${process.env.PRODUCTION ? 'PROD' : 'DEV'} mode)`)
    this.registerPlugins(plugins || {})

    document.addEventListener('DOMContentLoaded', e => {
      this.registerMasters()
      this.registerComponents()
      this.registerCustomElements()
      this.dispatchReadyState()
    })
  }


  /**
   * Add plugins and allow them to modify Component prototype
   * @param {Object} plugins 
   */
  registerPlugins(plugins) {
    for(let name in plugins) {
      this.plugins[name] = plugins[name]
      this.plugins[name].onInstall(this, Component)
      this.log(`- plugin [${name}] registered`)
    }
  }


  /**
   * Register master components
   */
  registerMasters() {
    for(let name in this.masters) {
      const instance = this.instanciateComponent(name, this.masters[name], document.body, true)
      this.log(`- master [${name}] registered`)
      instance.onInit()
    }
  }


  /**
   * Parse document and instanciate all components in [data-mod] attributes
   */
  registerComponents() {
    const els = document.querySelectorAll(`[${this.config.seekAttribute}]`)
    for(let i = 0; i < els.length; i++) {

      // seek related module class
      const name = els[i].getAttribute(this.config.seekAttribute)
      const ComponentClass = this.components[name]

      // register component instance
      if(ComponentClass) {

        // new regular component
        const instance = this.instanciateComponent(name, ComponentClass, els[i])
        this.log(`- component [${instance.$uid}] registered`)

        // attached to DOM (immediate)
        instance.onInit()

        // detached from DOM
        this.observeDestruction(els[i])
      }
      else this.log.error(`Modulus: unknown component [${name}]`)
    }
  }


  /**
   * Create mutation observe for DOM removal event
   * @param {HTMLElement} el 
   */
  observeDestruction(el) {
    const parent = el.parentElement
    const mut = new MutationObserver(e => {
      if(!parent.contains(el)) el.$component.onDestroy()
    })
    mut.observe(parent, { childList: true })
  }


  /**
   * Register components as native custom elements
   */
  registerCustomElements() {
    for(let name in this.webComponents) {

      try {

        // hyphenize tag name (FooBar -> foo-bar)
        let tagname = name.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
        if(tagname[0] === '-') tagname = tagname.substr(1)

        // attach modulus instance to component
        const ComponentClass = this.webComponents[name]
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
            this.$component.onInit()
            if(self.ready) this.$component.onReady()
          }

          // detached from DOM
          disconnectedCallback() {
            this.$component.onDestroy()
          }

        })
      }
      catch(err) {
        console.error('Modulus:', err)
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
  instanciateComponent(name, ComponentClass, el, isController) {

    // create new entry for component name
    this.instances[name] = this.instances[name] || []

    // parse attributes and data-attributes
    const attrs = {}
    for(let i = 0; i < el.attributes.length; i++) {
      attrs[el.attributes[i]] = el.getAttribute(el.attributes[i])
    }

    // lookup [ref] children
    const refs = {}
    const els = el.querySelectorAll(`:scope > [ref], *:not([${this.config.seekAttribute}]) [ref]`)
    for(let i = 0; i < els.length; i++) {
      const ref = els[j].getAttribute('ref')
      refs[ref] = els[j].$component || els[j]
    }

    // instanciate component object with attributes
    const instance = new ComponentClass(el, { attrs, refs, dataset: el.dataset })

    // bind identity data to instance
    instance.$uid = (isController) ? name : `${name}#${el.id || this.instances[name].length}`

    // bind logger to instance
    instance.log = new Logger({ active: this.config.debug, prefix: `[${instance.$uid}]` })

    // bind modulus to instance (needed for event dispatching)
    instance.$modulus = this

    // bind instance to element
    el.$component = instance

    // add instance to registry
    this.instances[name].push(instance)

    return instance
  }


  /**
   * Tell all instance that modulus is ready to operate
   */
  dispatchReadyState() {
    this.ready = true
    this.log(`Modulus ready!`)
    for(let name in this.instances) {
      for(let i = 0; i < this.instances[name].length; i++) {
        this.instances[name][i].onReady()
      }
    }
  }

}