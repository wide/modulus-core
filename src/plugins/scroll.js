import Plugin from '../plugin'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock' 
import updateOnScroll from 'uos'
import sticky from 'stickybits'
import jump from 'jump.js'

import dataScrollTo from '../directives/data-scroll-to'
import dataParallax from '../directives/data-parallax'
import dataSticky from '../directives/data-sticky'

export default class Scroll extends Plugin {

  constructor({ config } = {}) {
    super()
    this.config = config
    this.progresses = []
    this.stickied = []
    this.state = {
      up: false,
      down: false,
      value: 0,
      progress: 0
    }
  }
  

  /**
   * Build plugin necessities
   */
  onInit() {

    // add directives
    this.$modulus.addDirectives({
      dataParallax,
      dataScrollTo,
      dataSticky
    })
    
    // set first state
    this.computeScroll(0)

    // on scroll, recompute
    this.progress(0.0, 1.0, progress => {
      this.computeScroll(progress)
      this.$emit('scroll', this.state)
    })

    // listen for lock/unlock
    this.$on('body.lock', target => this.lock(target))
    this.$on('body.unlock', e => this.unlock())
  }

  
  /**
   * Compute current scroll state
   * @param {Number} progress 
   */
  computeScroll(progress) {
    this.state = {
      up: (window.scrollY < this.state.value),
      down: (window.scrollY > this.state.value),
      value: window.scrollY,
      progress
    }
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
    document.body.classList.add('-locked')
    document.documentElement.style.overflowY = 'hidden'
    disableBodyScroll(target)
  }

  
  /**
   * Unlock scroll
   */
  unlock() {
    document.body.classList.remove('-locked')
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
  parallax(el, { coef = .4, axis = 'Y' } = {}) {

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
   * Set element sticky when entering parent viewport
   * @param {HTMLElement} el 
   */
  sticky(el) {
    this.stickied.push({
      el, instance: sticky(el, {
        stickyBitStickyOffset: parseInt(el.dataset['sticky.offset']) || 0,
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

}