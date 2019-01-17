export default class Module {

  constructor(el, attrs, data) {
    this.el = el
    this.attrs = attrs
    this.data = data
  }

  onInit() {}

  $log(...args) {
    this.$modulus.log(this, ...args)
  }

  $on(event, callback, source = null) {
    this.$log(`listen event [${event}]`)
    this.$modulus.on(source, event, (...args) => {
      this.$log(`receive event [${event}]`)
      callback(...args)
    })
  }

  $emit(event, ...args) {
    this.$log(`emit event [${event}]`)
    this.$modulus.emit(this, event, ...args)
  }

}