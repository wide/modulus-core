import EventEmitter from 'tiny-emitter'
import Component from './component'
import Logger from './logger'
import dataMod from './directives/data-mod'

export default class Modulus extends EventEmitter {


  /**
   * New Modulus instance
   * @param {Object} opts 
   * @param {Object}  opts.config
   * @param {Object}  opts.plugins - list of plugins to register
   * @param {Object}  opts.directives - list of directives to register
   * @param {Object}  opts.components - list of regular components to register
   * @param {Object}  opts.webComponents - list of web components to register
   */
  constructor({ config = {}, plugins = {}, directives = {}, components = {}, webComponents = {} }) {

    super()

    this.entries = []
    this.plugins = plugins
    this.components = components
    this.webComponents = webComponents

    this.directives = { dataMod }
    this.addDirectives(directives)

    // assign config
    this.config = Object.assign({ debug: false, expose: false }, config)

    // assign logger
    this.log = new Logger({ active: this.config.debug, prefix: '' })

    // assign itself to window object if expose requested
    if(this.config.expose) {
      window.$mod = this
    }

    // start building
    this.log(`Modulus start (${process.env.PRODUCTION ? 'PROD' : 'DEV'} mode)`)
    document.addEventListener('DOMContentLoaded', e => this.build())

    // rebuild on specific event
    this.on('dom.updated', root => this.rebuild(root))
  }


  /**
   * Build plugins, controller and components
   */
  build() {
    this.setupPlugins()
    this.setupDirectives()
    this.bindDirectives()
    this.observeDestruction()
    this.emit('ready')
  }


  /**
   * Rebuild components
   * @param {HTMLElement} root
   */
  rebuild(root) {
    this.bindDirectives(root)
    this.emit('ready')
  }


  /**
   * Enable plugins
   */
  setupPlugins() {
    for(let name in this.plugins) {

      // bind modulus and logger
      this.plugins[name].$modulus = this
      this.plugins[name].log = new Logger({
        active: this.config.debug,
        prefix: `<${name}>`
      })

      // attach plugin to Component class
      Component.prototype[`$${name}`] = this.plugins[name]

      // init plugin
      this.log(`- plugin <${name}> registered`)
      if(this.plugins[name].onInit) {
        this.plugins[name].onInit()
      }
    }
  }


  /**
   * Add new directives
   * @param {Object} directives 
   */
  addDirectives(directives) {
    for(let n in directives) {
      this.directives[n] = directives[n]
    }
  }


  /**
   * Add directives
   */
  setupDirectives() {
    for(let n in this.directives) {
      this.directives[n].setup(this)
    }
  }
  

  /**
   * Bind directives to elements
   * @param {HTMLElement} root
   */
  bindDirectives(root = document.body) {
    for(let n in this.directives) {

      // get target elements
      const els = root.querySelectorAll(this.directives[n].seek)
      this.log('- directive', this.directives[n].seek)
      for(let i = 0; i < els.length; i++) {

        // create entry
        if(!this.entries.includes(els[i])) {
          this.entries.push(els[i])
          els[i].__directives = []
        }

        // bind directive
        this.directives[n].bind(this, els[i])
        els[i].__directives.push(n)
      }
    }
  }


  /**
   * Bind directives to elements
   */
  unbindDirectives() {
    for(let i = 0; i < this.entries.length; i++) {
      if(!document.body.contains(this.entries[i])) {

        // unbind directives
        for(let j = 0; j < this.entries[i].__directives.length; j++) {
          const n = this.entries[i].__directives[j]
          this.directives[n].unbind(this, this.entries[i])
        }

        // removed entry
        this.entries[i] = false
      }
    }

    // clear removed entries
    this.entries = this.entries.filter(Boolean)
  }


  /**
   * Observe element removal from DOM
   */
  observeDestruction() {
    new MutationObserver(e => this.unbindDirectives())
      .observe(document.body, { childList: true, subtree: true })
  }
  

  /**
   * Get component by selector
   * @param {String} selector 
   * @return {Component}
   */
  get(selector) {
    const el = document.querySelector(selector)
    if(el && el.__mod) return el.__mod
  }

}