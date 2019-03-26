import updateOnScroll from 'uos'

const PARALLAX_COEF = 0.4

export default class Scroll {

  constructor({ config } = {}) {
    this.affixed = []
    this.config = Object.assign({
      parallaxAttr: 'data-parallax'
    }, config)
  }
  

  /**
   * Bind instance to modulus
   * @param {Modulus} modulus 
   * @param {Component} Component 
   */
  onInstall(modulus, Component) {
    modulus.$scroll = Component.prototype.$scroll = this
    this._observeParallaxAttrs()
  }


  /**
   * Deconnect scroll listener
   */
  onDestroy() {
    window.removeEventListener('scroll', this._dispatchParallax)
  }


  /**
   * Trigger a callback on every scroll event between 2 positions
   * @param {Number|String} from position (can be percent: 0.5, or px: 100)
   * @param {Number|String} to position (can be percent: 0.5, or px: 100)
   * @param {Function} callback 
   */
  progress(from, to, callback) {
    updateOnScroll(from, to, callback)
  }


  /**
   * Add parallax effect on element depending on the scroll value
   * @param {HTMLElement} el 
   * @param {Float} coef 
   */
  parallax(el, { coef = PARALLAX_COEF, reverse = false, horizontal = false } = {}) {

    const bodyRect = document.body.getBoundingClientRect()
    const rect = el.getBoundingClientRect()

    const offsetTop = rect.top - bodyRect.top
    const axis = horizontal ? 'X' : 'Y'
    const sign = reverse ? '-' : ''

    this.progress(offsetTop - window.innerHeight, offsetTop + rect.height, progress => {
      el.style.transform = `translate${axis}(${sign}${progress * 100 * coef}%)`
    })
  }


  /**
   * Apply parallax observer to `[data-parallax]` attributes
   */
  _observeParallaxAttrs() {

    const els = document.querySelectorAll(`[${this.config.parallaxAttr}]`)
    for(let i = 0; i < els.length; i++) {
      this.parallax(els[i], {
        coef: parseFloat(els[i].getAttribute(this.config.parallaxAttr)) || undefined,
        reverse: els[i].getAttribute(`${this.config.parallaxAttr}.reverse`) === 'true',
        horizontal: els[i].getAttribute(`${this.config.parallaxAttr}.horizontal`) === 'true'
      })
    }

    // trigger scroll event once for detection
    window.dispatchEvent(new CustomEvent('scroll'))
  }


  affix(el) {
    // @todo
  }

}