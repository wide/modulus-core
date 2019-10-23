import EventEmitter from 'tiny-emitter'
import Logger from './logger'
import dataMod from './directives/data-mod'
import pkg from '../package.json'

const DEFAULT_DIRECTIVES = { dataMod }
let perf = 0

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
    perf = performance.now()

    // props
    this.entries = []
    this.running = false
    this.plugins = plugins
    this.components = components
    this.webComponents = webComponents
    this.directives = {}

    // assign config
    this.config = Object.assign({ debug: false, expose: false }, config)

    // assign logger
    this.log = new Logger()

    // assign itself to window object if expose requested
    if(this.config.expose) {
      window.__mod = this
    }

    // start process
    this.log(`Modulus v${pkg.version} - ${process.env.PRODUCTION ? 'production' : 'dev'} mode`)
    document.addEventListener('DOMContentLoaded', e => this.build(directives))

    // rebuild on specific event
    this.on('dom.updated', root => this.rebuild(root))
  }


  /**
   * Build plugins, controller and components
   */
  build(directives) {

    // build once
    if(this.running) return;
    this.running = true

    this.setupPlugins()
    this.addDirectives(DEFAULT_DIRECTIVES)
    this.addDirectives(directives)
    this.bindDirectives()
    this.observeDOM()
    this.log(`» loading done in ${(performance.now() - perf).toFixed(2)}ms`)
    this.emit('ready')
  }


  /**
   * Rebuild components
   */
  rebuild() {
    perf = performance.now()
    let rebuilt = this.bindDirectives()
    rebuilt += this.unbindEntries()
    if(rebuilt) {
      this.log(`» reloading done in ${(performance.now() - perf).toFixed(2)}ms`)
    }
  }


  /**
   * Enable plugins
   */
  setupPlugins() {
    for(let name in this.plugins) {

      // bind modulus and logger
      this.plugins[name].$modulus = this
      this.plugins[name].log = new Logger(`$${name}`)

      // init plugin
      this.log(`» load plugin $${name}`)
      if(this.plugins[name].onInit) {
        this.plugins[name].onInit()
      }
    }
  }


  /**
   * Add new directives
   * @param {Object} directives 
   * @param {Boolean} rebind 
   */
  addDirectives(directives, rebind = false) {
    for(let name in directives) {

      // setup directive
      this.log(`» load directive [${name}]`)
      if(directives[name].setup) {
        directives[name].setup(this)
      }

      // register
      this.directives[name] = directives[name]
    }

    // rebind if requested
    if(rebind) {
      this.bindDirectives()
    }
  }


  /**
   * Bind all directives
   * @param {HTMLElement} root
   * @return {Number}
   */
  bindDirectives(root = document) {
    let binded = 0
    for(let name in this.directives) {
      const els = root.querySelectorAll(this.directives[name].seek)
      for(let i = 0; i < els.length; i++) {
        binded += this.bindDirective(name, this.directives[name], els[i])
      }
    }
    return binded
  }


  /**
   * Bind directive to element
   * @param {String} name
   * @param {Object} directive
   * @param {HTMLElement} el
   * @return {Number}
   */
  bindDirective(name, directive, el) {

    // already applied
    if(el.__directives && el.__directives[name]) {
      return 0
    }

    // register directive in element
    el.__directives = el.__directives || {}
    el.__directives[name] = true

    // bind directive to element
    this.log(`» bind directive [${name}] to`, el)
    directive.bind(this, el)

    // keep element instance for further unbinding
    this.entries.push(el)

    return 1
  }


  /**
   * Unbind all entries
   * @return {Number}
   */
  unbindEntries() {

    // unbind unconnected entries
    let unbinded = 0
    for(let i = 0; i < this.entries.length; i++) {
      if(!this.entries[i].isConnected) {
        unbinded += this.unbindEntry(i, this.entries[i])
      }
    }

    // clear list
    this.entries = this.entries.filter(Boolean)
    return unbinded
  }


  /**
   * Unbind all directives of element
   * @param {Number} i
   * @param {HTMLElement} entry
   * @return {Number}
   */
  unbindEntry(i, entry) {
    let unbinded = 0
    for(let name in this.directives) {
      if(entry.__directives && entry.__directives[name]) {

        // unregister directive from element
        delete entry.__directives[name]

        // unbind directive
        if(this.directives[name].unbind) {
          this.log(`» unbind directive [${name}] from`, entry)
          this.directives[name].unbind(this, entry)
        }

        // remove from entry list
        this.entries[i] = false

        unbinded++
      }
    }
    return unbinded
  }


  /**
   * Observe element in DOM
   */
  observeDOM() {
    new MutationObserver(mutations => {
      for(let i = 0; i < mutations.length; i++) {
        if(mutations[i].addedNodes.length || mutations[i].removedNodes.length) {
          setTimeout(() => this.rebuild(), 25)
          break
        }
      }
    })
    .observe(document.body, {
      childList: true,
      subtree: true
    })
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