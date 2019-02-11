import EventEmitter from 'tiny-emitter'

export default class Modulus extends EventEmitter {

  constructor(opts = {}) {

    super()
    const { config, plugins, components } = opts

    this.config = Object.assign({
      debug: false,
      seekAttribute: 'data-mod',
      customElements: false
    }, config)

    this.plugins = {}
    this.instances = {}
    this.components = components || {}
    this.ready = false

    // register plugins
    this.registerPlugins(plugins || {})

    // register custom elements
    if(this.config.customElements) {
      this.registerCustomElements()
    }

    // parse document
    document.addEventListener('DOMContentLoaded', e => {
      this.parseDocument()
      this.dispatchReadyState()
    })
  }


  /**
   * Add plugins and allow them to modify Component prototype
   * @param {Collection} plugins 
   */
  registerPlugins(plugins) {
    for(let name in plugins) {
      this.plugins[name] = plugins[name](Module, Modulus)
    }
  }


  /**
   * Parse document and instanciate all components in [data-mod] attributes
   */
  parseDocument() {
    document.querySelectorAll(`[${this.config.seekAttribute}]`).forEach(el => {

      // seek related module class
      const name = el.getAttribute(this.config.seekAttribute)
      const ComponentClass = this.components[name]

      // register component instance
      if(ComponentClass) {

        // new regular component
        this.instanciateComponent(name, ComponentClass, el)

        // attached to DOM (immediate)
        el.$component.onInit()

        // detached from DOM
        const parent = el.parentElement
        const mut = new MutationObserver(e => {
          if(!parent.contains(el)) el.$component.onDestroy()
        })
        mut.observe(parent, { childList: true })
      }
      else console.error(`Modulus: unknown component [${name}]`)
    })
  }


  /**
   * Register components as native custom elements
   */
  registerCustomElements() {
    for(let name in this.components) {
      
      // sanitize tag name (FooBar -> foo-bar)
      let tagname = name.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
      if(tagname.startsWith('-')) tagname = tagname.substr(1)

      // ignore invalid tagname
      if(!tagname.includes('-')) {
        console.error(`Modulus: invalid tagname <${tagname}>`)
        continue
      }

      // attach modulus instance to component
      const ComponentClass = this.components[name]
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
  }


  /**
   * Instance component and bind related data
   * @param {String} name 
   * @param {Class} ModuleClass 
   * @param {HTMLElement} el 
   */
  instanciateComponent(name, ComponentClass, el) {

    // create new entry for component name
    this.instances[name] = this.instances[name] || []

    // parse attributes and data-attributes
    const attrs = {}
    Array.from(el.attributes).forEach(attr => attrs[attr] = el.getAttribute(attr))

    // lookup [ref] children
    const refs = {}
    el.querySelectorAll(`> [ref], *:not([${this.seekAttribute}]) [ref]`).forEach(child => {
      const ref = child.getAttribute('ref')
      refs[ref] = child.$component || child
    })

    // instanciate component object with attributes
    const instance = new ComponentClass(el, {
      attrs, refs,
      dataset: el.dataset
    })

    // bind identity data to instance
    instance.$uid = `${name}-${this.instances[name].length}`

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
      this.instances[name].forEach(i => i.onReady())
    }
  }

}