export default {

  /**
   * Selector
   */
  seek: '[data-sticky]',


  /**
   * Bind directive to element
   * @param {Modulus} modulus 
   * @param {HTMLElement} el 
   */
  bind(modulus, el) {
    modulus.plugins.scroll.sticky(el)
  },


  /**
   * Unbind directive from element
   * @param {Modulus} modulus 
   * @param {HTMLElement} el 
   */
  unbind(modulus, el) {
    modulus.plugins.scroll.clearSticky(el)
  }

}