export default {

  /**
   * Selector
   */
  seek: '[data-src]',


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
  }

}