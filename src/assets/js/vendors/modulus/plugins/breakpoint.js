export default class Breakpoint {

  constructor(list) {
    this.current = this.compute()
    this.list = list
  }


  /**
   * Bind instance to modulus
   * @param {Modulus} modulus 
   * @param {Component} Component 
   */
  onInstall(modulus, Component) {
    modulus.$breakpoint = Component.prototype.$breakpoint = this
    this.listen(breakpoint => modulus.emit('breakpoint', breakpoint))
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
    for(let key in this.list) {
      if(this.up(key)) name = key
    }
    return { name, value: window.innerWidth }
  }


  /**
   * Check if current windiwo with is from specific breakpoint
   * @param {String} name 
   */
  up(name) {
    return (window.innerWidth >= this.list[name])
  }

}