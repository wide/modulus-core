import EventEmitter from 'tiny-emitter'
import Component from './component'
import Logger from './logger'

export default class Modulus extends EventEmitter {


  /**
   * New Modulus instance
   * @param {Object} opts 
   * @param {Object}  opts.config
   * @param {Object}  opts.plugins - list of plugins to register
   * @param {Object}  opts.components - list of regular components to register
   * @param {Object}  opts.webComponents - list of web components to register
   */
  constructor({ config, plugins, components, webComponents }) {

    super()

    this.plugins = {}
    this.instances = {}
    this.components = components || {}
    this.webComponents = webComponents || {}
    this.ready = false

    this.config = Object.assign({
      debug: false,
      seekAttribute: 'data-mod'
    }, config)

    // register plugins and custom elements
    this.registerPlugins(plugins || {})
    this.registerCustomElements()

    // parse document for regular components
    document.addEventListener('DOMContentLoaded', e => {
      this.parseDocument()
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
    }
  }


  /**
   * Parse document and instanciate all components in [data-mod] attributes
   */
  parseDocument() {
    const els = document.querySelectorAll(`[${this.config.seekAttribute}]`)
    for(let i = 0; i < els.length; i++) {

      // seek related module class
      const name = els[i].getAttribute(this.config.seekAttribute)
      const ComponentClass = this.components[name]

      // register component instance
      if(ComponentClass) {

        // new regular component
        this.instanciateComponent(name, ComponentClass, els[i])

        // attached to DOM (immediate)
        els[i].$component.onInit()

        // detached from DOM
        this.observeDestruction(els[i])
      }
      else console.error(`Modulus: unknown component [${name}]`)
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
   */
  instanciateComponent(name, ComponentClass, el) {

    // create new entry for component name
    this.instances[name] = this.instances[name] || []

    // parse attributes and data-attributes
    const attrs = {}
    for(let i in el.attributes) {
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
    instance.$uid = `${name}#${el.id || this.instances[name].length}`

    // bind logger to instance
    instance.log = new Logger({ active: this.config.debug, prefix: `[${instance.$uid}]` })

    // bind modulus to instance (needed for event dispatching)
    instance.$modulus = this

    // bind instance to element
    el.$component = instance

    // add instance to registry
    this.instances[name].push(instance)
  }


  /**
   * Tell all instance that modulus is ready to operate
   */
  dispatchReadyState() {
    this.ready = true
    for(let name in this.instances) {
      for(let i in this.instances[name]) {
        this.instances[name][i].onReady()
      }
    }
  }

}