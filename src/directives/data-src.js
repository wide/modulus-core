export default {

  /**
   * Props
   */
  seek: '[data-src]',


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
    modulus.plugins.viewport.observe({
      target: el,
      once: true, // destroy observer after callback
      offset: '200px', // trigger 200px before entering viewport
      callback: item => item.src = item.dataset.src
    })
  },


  /**
   * Unbind directive from element
   * @param {Modulus} modulus 
   * @param {HTMLElement} el 
   */
  unbind(modulus, el) {}

}