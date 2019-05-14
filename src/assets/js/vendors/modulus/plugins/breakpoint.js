import Plugin from 'modulus/plugin'

export default class Breakpoint extends Plugin {


  /**
   * New Breapoint plugin
   * @param {Object} opts 
   * @param {Object} opts.sizes of breakpoint sizes
   */
  constructor({ sizes }) {
    super() 
    this.sizes = this._resolveBoundaries(sizes)
    this.current = this.compute()
    this.callbacks = []
  }


  /**
   * Compute breakpoints with boudaries
   * @param {Object} sizes
   * @return {Object}
   */
  _resolveBoundaries(sizes) {
    const output = {}
    const sorted = Object.keys(sizes).map(key => ({ key, value: sizes[key] })).sort((a, b) => a[1] - b[1])
    for(let i = 0; i < sorted.length; i++) {
      const current = sorted[i]
      const nextValue = sorted[i + 1] ? (sorted[i + 1].value - 1) : Infinity
      output[current.key] = { min: current.value, max: nextValue }
    }
    return output
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
    return { name, value: window.innerWidth, ...this.sizes[name] }
  }


  /**
   * Check if size is above specific breakpoint
   * @param {String} name 
   * @return {Boolean}
   */
  up(name) {
    return (window.innerWidth >= this.sizes[name].min)
  }


  /**
   * Check if size is under specific breakpoint
   * @param {String} name 
   * @return {Boolean}
   */
  down(name) {
    return (window.innerWidth <= this.sizes[name].max)
  }


  /**
   * Check if size is in a specific breakpoint
   * @param {String} name 
   * @return {Boolean}
   */
  only(name) {
    return this.range(name, name)
  }


  /**
   * Check if size is between specific breakpoints
   * @param {String} from 
   * @param {String} to 
   */
  range(from, to) {
    return (
      window.innerWidth >= this.sizes[from].min &&
      window.innerWidth <= this.sizes[to].max
    )
  }

}