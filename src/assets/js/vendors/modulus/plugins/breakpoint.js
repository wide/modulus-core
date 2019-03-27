export default class Breakpoint {


  /**
   * New Breapoint plugin
   * @param {Object} opts 
   * @param {Object} opts.sizes of breakpoint sizes
   */
  constructor({ sizes }) {
    this.current = this.compute()
    this.sizes = sizes
  }


  /**
   * Build plugin necessities
   */
  onInit() {
    this.listen(breakpoint => this.$modulus.emit('breakpoint', breakpoint))
  }


  /**
   * Listen viewport resize and compute breakpoint
   * @param {Function} callback 
   */
  listen(callback) {
    window.addEventListener('resize', e => {
      const computed = this.compute()
      if(computed.name !== this.current.name) {
        this.current = computed
        callback(computed)
      }
    })
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
   * Check if current windiwo with is from specific breakpoint
   * @param {String} name 
   */
  up(name) {
    return (window.innerWidth >= this.sizes[name])
  }

}