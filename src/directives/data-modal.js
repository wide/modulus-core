export default {

  /**
   * Selector
   */
  seek: '[data-modal\\.open]',


  /**
   * Bind directive to element
   * @param {Modulus} modulus 
   * @param {HTMLElement} el 
   */
  bind(modulus, el) {
    el.addEventListener('click', e => {
      const modal = modulus.get(`#${el.dataset['modal.open']}`)
      if(modal) modal.open(el)
    })
  }

}