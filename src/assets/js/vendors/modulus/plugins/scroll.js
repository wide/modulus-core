import Plugin from 'modulus/plugin'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock' 
import updateOnScroll from 'uos'
import sticky from 'stickybits'
import jump from 'jump.js'
import CustomEvent from '~/utils/custom-event'
import { PARALLAX_COEF } from '~/consts'


export default class Scroll extends Plugin {

  constructor({ config } = {}) {
    super()

    this.progresses = []
    this.stickied = []
    this.state = {
      up: false,
      down: false,
      value: 0,
      progress: 0
    }
    
    this.config = Object.assign({
      parallaxAttr: 'data-parallax',
      stickyAttr: 'data-sticky',
      scrollToAttr: 'data-scroll-to'
    }, config)
  }
  

  /**
   * Build plugin necessities
   */
  onInit() {

    this._observeScroll()
    this._observeScrollTo()
    this._observeParallaxAttrs()
    this._observeStickyAttrs()

    this.$on('route.destroy', root => {
      this._clearParallaxAttrs(root)
      this._clearStickyAttrs(root)
    })

    this.$on('route.loaded', root => {
      this._observeParallaxAttrs(root)
      this._observeStickyAttrs(root)
    })
  }


  /**
   * Scroll to specific element in page
   * @param {HTMLElement|String} target 
   * @para {Object} tops
   */
  to(target, opts) {
    jump(target, opts)
  }


  /**
   * Lock scroll
   * @param {HTMLElement} target
   */
  lock(target) {
    document.documentElement.style.overflowY = 'hidden'
    disableBodyScroll(target)
  }

  
  /**
   * Unlock scroll
   */
  unlock() {
    document.documentElement.style.overflowY = 'scroll'
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
  parallax(el, { coef = PARALLAX_COEF, axis = 'Y' } = {}) {

    const bodyRect = document.body.getBoundingClientRect()
    const rect = el.getBoundingClientRect()

    // compute boudings
    const offsetTop = rect.top - bodyRect.top
    const boundStart = offsetTop - window.innerHeight
    const boundEnd = offsetTop + rect.height

    // resolve axis
    let _axis = axis.toUpperCase()
    let _sign = ''

    // reverse direction
    if(_axis[0] === '-') {
      _sign = '-'
      _axis = _axis.substr(1)
    }

    this.progress(boundStart, boundEnd, progress => {
      el.style.transform = `translateZ(0) translate${_axis}(${_sign}${progress * (100 * coef)}%)`
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
   * Listen scroll and compute values
   */
  _observeScroll() {

    // set first state
    this._computeScroll(0)

    // on scroll, recompute
    this.progress(0.0, 1.0, progress => {
      this._computeScroll(progress)
      this.$emit('scroll', this.state)
    })
  }


  _computeScroll(progress) {
    this.state = {
      up: (window.scrollY < this.state.value),
      down: (window.scrollY > this.state.value),
      value: window.scrollY,
      progress
    }
  }


  /**
   * Listen scroolto attributes
   */
  _observeScrollTo() {
    const els = document.querySelectorAll(`[${this.config.scrollToAttr}]`)
    for(let i = 0; i < els.length; i++) {
      els[i].addEventListener('click', e => {
        e.stopPropagation()
        const target = e.target.getAttribute(this.config.scrollToAttr) || e.target.href
        this.to(target)
        return false
      })
    }
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
        axis: els[i].getAttribute(`${this.config.parallaxAttr}.axis`) || undefined
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
  sticky(el) {
    this.stickied.push({
      el, instance: sticky(el, {
        stickyBitStickyOffset: parseInt(el.getAttribute(`${this.config.stickyAttr}.offset`)) || 0,
        useStickyClasses: true,
        parentClass: '-sticky-parent',
        stickyClass: '-sticky',
        stuckClass: '-sticky-stuck',
        stickyChangeClass: '-sticky'
      })
    })
  }


  /**
   * Clear sticky handler for an element
   * @param {HTMLElement} el 
   */
  clearSticky(el) {
    const i = this.stickied.findIndex(a => a.el == el)
    if(i >= 0) this.stickied[i].instance.cleanup()
  }


  /**
   * Apply sticky observer to `[data-sticky]` attributes
   * @param {HTMLElement} root
   */
  _observeStickyAttrs(root = document.body) {
    const els = root.querySelectorAll(`[${this.config.stickyAttr}]`)
    for(let i = 0; i < els.length; i++) {
      this.sticky(els[i])
    }
  }


  /**
   * Clear sticky attributes observers
   * @param {HTMLElement} root 
   */
  _clearStickyAttrs(root = document.body) {
    const els = root.querySelectorAll(`[${this.config.stickyAttr}]`)
    for(let i = 0; i < els.length; i++) {
      this.clearSticky(els[i])
    }
  }

}