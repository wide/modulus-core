export default {

  /**
   * Props
   */
  seek: '[data-scroll-to]',


  /**
   * Setup hook, called once
   * @param {Modulus} modulus 
   */
  setup(modulus) {},


  /**
   * Bind directive to element
   * @param {Modulus} modulus 
   * @param {HTMLElement} el 
   */
  bind(modulus, el) {
    el.addEventListener('click', e => {
      e.stopPropagation()
      modulus.plugins.scroll.to(e.target.dataset.scrollTo || e.target.href)
      return false
    })
  },


  /**
   * Unbind directive from element
   * @param {Modulus} modulus 
   * @param {HTMLElement} el 
   */
  unbind(modulus, el) {}

}