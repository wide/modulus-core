import { fireEvent } from '../utils/custom-event'

export default {

  /**
   * Props
   */
  seek: '[data-parallax]',


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
    modulus.plugins.scroll.parallax(el, {
      coef: parseFloat(el.dataset.parallax) || undefined,
      axis: el.dataset['parallax.axis'] || undefined
    })
    fireEvent(window, 'scroll')
  },


  /**
   * Unbind directive from element
   * @param {Modulus} modulus
   * @param {HTMLElement} el
   */
  unbind(modulus, el) {
    modulus.plugins.scroll.clearParallax(el)
  }

}