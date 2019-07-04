import Component from '../component'

export default {

  /**
   * Props
   */
  seek: '[data-mod]',


  /**
   * Setup hook, called once
   * @param {Modulus} modulus 
   */
  setup(modulus) {

    // bind modulus and plugins to component prototype
    Component.prototype.$modulus = modulus
    for(let name in modulus.plugins) {
      Component.prototype[`$${name}`] = modulus.plugins[name]
    }

    // register web-components
    for(let tagname in modulus.webComponents) {
      try {
        const ComponentClass = modulus.webComponents[tagname]
        modulus.log(`Custom Element [${tagname}] registered`)
        this.registerWebComponent(tagname, ComponentClass)
      }
      catch(err) {
        this.log.error(err)
        continue
      }

    }
  },


  /**
   * Bind directive to element
   * @param {Modulus} modulus 
   * @param {HTMLElement} el 
   */
  bind(modulus, el) {

    // resolve component class
    const name = el.dataset.mod
    const ComponentClass = modulus.components[name]
    if(!ComponentClass) {
      modulus.log.error(`Unknown component [${name}]`)
      return
    }

    // instanciate component
    this.register(el, name, ComponentClass)
    modulus.log(`  - component [${el.__mod.uid}] added`)
  },


  /**
   * Define and register standard element
   * @param {HTMLElement} el 
   * @param {String} name 
   * @param {Component} ComponentClass 
   */
  register(el, name, ComponentClass) {
    const instance = this.instanciate(el, name, ComponentClass)
    if(instance.onInit) {
      instance.onInit()
    }
  },


  /**
   * Define and register custom element
   * @param {String} tagname 
   * @param {Component} ComponentClass 
   */
  registerWebComponent(tagname, ComponentClass) {
    const self = this
    window.customElements.define(tagname, class extends HTMLElement {

      // new web component
      constructor() {
        super()
        this.style.display = 'block' // immediat oveflow issue
        self.instanciate(this, tagname, ComponentClass)
      }

      // attached to DOM
      connectedCallback() {
        if(this.__mod.onInit) {
          this.__mod.onInit()
        }
      }

      // detached from DOM
      disconnectedCallback() {
        if(this.__mod.onDestroy) {
          this.__mod.onDestroy()
        }
      }

    })
  },


  /**
   * Instanciate regular component
   * @param {HTMLElement} el 
   * @param {String} name 
   * @param {Object} ComponentClass 
   * @return {Object}
   */
  instanciate(el, name, ComponentClass) {
    return new ComponentClass(el, {
      uid: el.id ? `${name}#${el.id}` : name,
      dataset: el.dataset,
      attrs: this.parseAttrs(el),
      refs: this.parseRefs(el)
    })
  },


  /**
   * Parse element attributes
   * @param {HTMLElement} el 
   * @return {Object}
   */
  parseAttrs(el) {
    const attrs = {}
    for(let i = 0; i < el.attributes.length; i++) {
      attrs[el.attributes[i]] = el.getAttribute(el.attributes[i])
    }
    return attrs
  },


  /**
   * Parse element [ref] children
   * @param {HTMLElement} el 
   * @return {Object}
   */
  parseRefs(el) {
    const refs = {}
    const els = Array.from(el.querySelectorAll(`*:not([data-mod]) [ref]`))
    els.concat(...Array.from(el.children).filter(child => child.hasAttribute('ref'))) // ie11 fix for direct child ref
    for(let i = 0; i < els.length; i++) {
      const ref = els[i].getAttribute('ref')
      refs[ref] = els[i]
    }
    return refs
  },


  /**
   * Unbind directive from element
   * @param {Modulus} modulus 
   * @param {HTMLElement} el 
   */
  unbind(modulus, el) {
    if(el.__mod && el.__mod.onDestroy) {
      el.__mod.onDestroy()
    }
  }

}