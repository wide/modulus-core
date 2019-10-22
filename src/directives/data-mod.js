import Component from '../component'

export default {

  /**
   * Selector
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
    if(window.customElements) this.registerWebComponents(modulus)
    else this.registerWebComponentsWhenReady(modulus)

    // setup components
    for(let name in modulus.components) {
      modulus.log.debug(`» load component <${name}>`)
      if(modulus.components[name].onSetup) {
        modulus.components[name].onSetup(modulus)
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
      modulus.log.error(`Unknown component '${name}'`, el)
      return
    }

    // instanciate component
    const instance = new ComponentClass(el)
    modulus.log.debug(`  ↳ init component <${el.__mod.uid}>`)
    if(instance.onInit) {
      instance.onInit()
    }
  },


  /**
   * Check when document is ready to register custom elements (Edge fix)
   * @param {Number} wait
   * @param {Modulus} modulus
   */
  registerWebComponentsWhenReady(modulus, wait = 250) {
    let int = setInterval(() => {
      if(window.customElements) {
        clearInterval(int)
        this.registerWebComponents(modulus)
      }
    }, wait)
  },


  /**
   * Define all custom elements
   * @param {Modulus} modulus 
   */
  registerWebComponents(modulus) {
    for(let tagname in modulus.webComponents) {
      try {
        const ComponentClass = modulus.webComponents[tagname]
        modulus.log.debug(`  ↳ load web component <${tagname}>`)
        this.registerWebComponent(tagname, ComponentClass)
      }
      catch(err) {
        modulus.log.error(err)
        continue
      }
    }
  },


  /**
   * Define and register custom element
   * @param {String} tagname 
   * @param {Component} ComponentClass 
   */
  registerWebComponent(tagname, ComponentClass) {
    window.customElements.define(tagname, class extends HTMLElement {

      // new web component
      constructor() {
        super()
        this.style.display = 'block' // immediat overflow issue
        new ComponentClass(el)
      }

      // attached to DOM
      connectedCallback() {
        modulus.log.debug(`  ↳ init web component <${this.__mod.uid}>`)
        if(this.__mod.onInit) {
          this.__mod.onInit()
        }
      }

      // detached from DOM
      disconnectedCallback() {
        modulus.log.debug(`  ↳ destroy web component <${this.__mod.uid}>`)
        if(this.__mod.onDestroy) {
          this.__mod.onDestroy()
        }
      }

    })
  },


  /**
   * Unbind directive from element
   * @param {Modulus} modulus 
   * @param {HTMLElement} el 
   */
  unbind(modulus, el) {
    if(el.__mod) {
      modulus.log.debug(`  ↳ destroy component <${el.__mod.uid}>`)
      if(el.__mod.onDestroy) {
        el.__mod.onDestroy()
      }
      delete el.__mod
    }
  }

}