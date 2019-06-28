export default {

  /**
   * Props
   */
  seek: '[data-mod]',
  components: [],


  /**
   * Setup hook, called once
   * @param {Modulus} modulus 
   */
  setup(modulus) {

    // register web-component
    const self = this
    for(let tagname in modulus.webComponents) {

      try {

        // attach modulus instance to component
        const ComponentClass = modulus.webComponents[tagname]

        // register to custom elements registry
        modulus.log(`Custom Element [${tagname}] registered`)
        window.customElements.define(tagname, class extends HTMLElement {

          // new web component
          constructor() {
            super()
            this.style.display = 'block' // immediat oveflow issue
            self.instanciateComponent(this, tagname, ComponentClass, modulus)
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

    // instanciate component
    if(ComponentClass) {
      const instance = this.instanciateComponent(el, name, ComponentClass, modulus)
      this.components.push(instance)
      modulus.log(`  - component [${instance.uid}] initialized`)
      if(instance.onInit) {
        instance.onInit()
      }
    }
    else {
      modulus.log.error(`Unknown component [${name}]`)
    }
  },


  /**
   * Instanciate regular component
   * @param {HTMLElement} el 
   * @param {String} name 
   * @param {Object} ComponentClass 
   * @param {Modulus} modulus 
   * @return {Object}
   */
  instanciateComponent(el, name, ComponentClass, modulus) {
    return new ComponentClass(el, {
      uid: el.id ? `${name}#${el.id}` : name,
      dataset: el.dataset,
      attrs: this.parseAttrs(el),
      refs: this.parseRefs(el),
      modulus
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

    // trigger onDestroy hook
    if(el.__mod && el.__mod.onDestroy) {
      el.__mod.onDestroy()
    }

    // remove from collection
    const index = this.components.indexOf(el.__mod)
    if(index >= 0) {
      this.components.splice(index, 1)
    }
  }

}