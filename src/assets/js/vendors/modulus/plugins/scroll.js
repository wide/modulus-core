import Plugin from 'modulus/plugin'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock' 
import updateOnScroll from 'uos'
import sticky from 'stickybits'
import { PARALLAX_COEF } from '~/consts'

export default class Scroll extends Plugin {

  constructor({ config } = {}) {
    super()

    this.progresses = []
    this.affixed = []
    
    this.config = Object.assign({
      parallaxAttr: 'data-parallax',
      affixAttr: 'data-affix'
    }, config)
  }
  

  /**
   * Build plugin necessities
   */
  onInit() {

    this._observeParallaxAttrs()
    this._observeAffixAttrs()

    this.$on('route.destroy', root => {
      this._clearParallaxAttrs(root)
      this._clearAffixAttrs(root)
    })

    this.$on('route.loaded', root => {
      this._observeParallaxAttrs(root)
      this._observeAffixAttrs(root)
    })
  }


  /**
   * Lock scroll
   * @param  {...HTMLElement} targets 
   */
  lock(...targets) {
    for(let i = 0; i < targets.lenght; i++) disableBodyScroll(targets[i])
  }

  
  /**
   * Unlock scroll
   */
  unlock() {
    clearAllBodyScrollLocks()
  }


  /**
   * Trigger a callback on every scroll event between 2 positions
   * @param {Number|String} from position (can be percent: 0.5, or px: 100)
   * @param {Number|String} to position (can be percent: 0.5, or px: 100)
   * @param {Function} callback 
   */
  progress(from, to, callback, el) {
    this.progresses.push({
      el, callback,
      remove: updateOnScroll(from, to, callback)
    })
  }


  /**
   * Delete progress listeners
   * @param {Function} callback 
   */
  clearProgress(callback) {
    const i = this.progresses.findIndex(p => p.callback == callback)
    if(i >= 0) this.progresses[i].remove()
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
    }, el)
  }


  /**
   * Clear parallax listeners
   * @param {HTMLElement} el 
   */
  clearParallax(el) {
    const i = this.progresses.findIndex(p => p.el == el)
    if(i >= 0) this.progresses[i].remove()
  }


  /**
   * Apply parallax observer to `[data-parallax]` attributes
   * @param {HTMLElement} root
   */
  _observeParallaxAttrs(root = document.body) {

    const els = root.querySelectorAll(`[${this.config.parallaxAttr}]`)
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


  /**
   * Clear parallax attributes observers
   * @param {HTMLElement} root 
   */
  _clearParallaxAttrs(root = document.body) {
    const els = root.querySelectorAll(`[${this.config.parallaxAttr}]`)
    for(let i = 0; i < els.length; i++) {
      this.clearParallax(els[i])
    }
  }


  /**
   * Set element sticky when entering parent viewport
   * @param {HTMLElement} el 
   */
  affix(el) {
    this.affixed.push({
      el, instance: sticky(el, {
        stickyBitStickyOffset: parseInt(el.getAttribute(`${this.config.affixAttr}.offset`)) || 0,
        useStickyClasses: true,
        parentClass: '-affix-parent',
        stickyClass: '-affix',
        stuckClass: '-affix-stuck',
        stickyChangeClass: '-affix'
      })
    })
  }


  /**
   * Clear affix handler for an element
   * @param {HTMLElement} el 
   */
  clearAffix(el) {
    const i = this.affixed.findIndex(a => a.el == el)
    if(i >= 0) this.affixed[i].instance.cleanup()
  }


  /**
   * Apply affix observer to `[data-affix]` attributes
   * @param {HTMLElement} root
   */
  _observeAffixAttrs(root = document.body) {
    const els = root.querySelectorAll(`[${this.config.affixAttr}]`)
    for(let i = 0; i < els.length; i++) {
      this.affix(els[i])
    }
  }


  /**
   * Clear affix attributes observers
   * @param {HTMLElement} root 
   */
  _clearAffixAttrs(root = document.body) {
    const els = root.querySelectorAll(`[${this.config.affixAttr}]`)
    for(let i = 0; i < els.length; i++) {
      this.clearAffix(els[i])
    }
  }

}