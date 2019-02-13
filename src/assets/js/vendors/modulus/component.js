import EventEmitter from 'tiny-emitter'

export default class Component extends EventEmitter {

  constructor(el, { attrs, dataset, refs }) {
    super()
    this.el = el
    this.attrs = attrs
    this.dataset = dataset
    this.refs = refs
  }

  onInit() {}
  onReady() {}
  onDestroy() {}

  log(...args) {
    if(this.$modulus.config.debug) {
      console.log(`${this.$uid}:`, ...args)
    }
  }

  $on(event, callback) {
    this.$modulus.on(event, (...args) => {
      this.log(`receive event [${event}]`)
      callback(...args)
    })
  }

  $emit(event, ...args) {
    this.log(`emit event [${event}]`)
    this.emit(event, ...args) // locally
    this.$modulus.emit(event, ...args) // globally
  }

  $viewport(el, callback, opts = {}) {
    (new IntersectionObserver(entries => callback(entries[0]), opts)).observe(el)
  }

}