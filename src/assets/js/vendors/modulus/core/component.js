export default class Component {

  constructor(el, attrs, dataset) {
    this.el = el
    this.attrs = attrs
    this.dataset = dataset
  }

  onInit() {}
  onReady() {}
  onDestroy() {}

  log(...args) {
    if(this.$modulus.config.debug) {
      console.log(`${this.$uid}:`, ...args)
    }
  }

  $on(event, callback, source = null) {
    this.$modulus.on(source, event, (...args) => {
      this.log(`receive event [${event}]`)
      callback(...args)
    })
  }

  $emit(event, ...args) {
    this.log(`emit event [${event}]`)
    this.$modulus.emit(this, event, ...args)
  }

  $viewport(el, callback, opts = {}) {
    (new IntersectionObserver(entries => callback(entries[0]), opts)).observe(el)
  }

}