import Plugin from 'modulus/plugin'

export default class Breakpoint extends Plugin {


  /**
   * New Breapoint plugin
   * @param {Object} opts 
   * @param {Object} opts.sizes of breakpoint sizes
   */
  constructor({ sizes }) {
    super()
    
    this.sizes = sizes
    this.current = this.compute()
    this.callbacks = []
  }


  /**
   * Build plugin necessities
   */
  onInit() {
    window.addEventListener('resize', e => this.onResize())
    this.listen(breakpoint => this.$emit('breakpoint', breakpoint))
  }


  /**
   * Listen viewport resize and compute breakpoint
   * @param {Function} callback 
   */
  onResize() {
    const computed = this.compute()
    if(computed.name !== this.current.name) {
      this.current = computed
      for(let i = 0; i < this.callbacks.length; i++) {
        this.callbacks[i](computed)
      }
    }
  }


  /**
   * Add listener on resize event
   */
  listen(callback) {
    this.callbacks.push(callback)
  }


  /**
   * Remove listener
   * @param {Function} callback 
   */
  clear(callback) {
    const i = this.callbacks.indexOf(callback)
    this.callbacks.splice(i, 1)
  }


  /**
   * Compute breakpoint from window width
   */
  compute() {
    let name = null
    for(let key in this.sizes) {
      if(this.up(key)) name = key
    }
    return { name, value: window.innerWidth }
  }


  /**
   * Check if current screen width is from specific breakpoint
   * @param {String} name 
   */
  up(name) {
    return (window.innerWidth >= this.sizes[name])
  }

}