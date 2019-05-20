import { TweenLite, TimelineLite } from 'gsap'
import { ANIM_DURATION, ANIM_DELAY } from '~/consts'


/**
 * Hide element with slide effect bottom to top
 * @param {HTMLElement} el
 * @param {Number} duration ms
 * @return {Promise}
 */
export function slideUp(el, duration = ANIM_DURATION) {
  return new Promise(onComplete => {
    el.style.overflow = 'hidden'
    TweenLite.to(el, duration/1000, { height: 0, display: 'none', onComplete })
  })
}


/**
 * Show element with slide effect top to bottom
 * @param {HTMLElement} el
 * @param {Number} duration ms
 * @return {Promise}
 */
export function slideDown(el, duration = ANIM_DURATION) {
  return new Promise(onComplete => {
    el.style.overflow = 'hidden'
    TweenLite.set(el, { height: 'auto', display: 'block' })
    TweenLite.from(el, duration/1000, { height: 0, onComplete })
  })
}


/**
 * Hide or shor element with slide effect
 * @param {HTMLElement} el
 * @param {Number} duration ms
 * @returns {Promise}
 */
export function slideToggle(el, duration = ANIM_DURATION) {
  return (window.getComputedStyle(el).display === 'none')
    ? slideDown(el, duration)
    : slideUp(el, duration)
}


/**
 * Animate element
 * @param {HTMLElement} el 
 * @param {Object} to 
 * @param {Number} duration 
 * @return {Promise}
 */
export function animate(el, to, duration = ANIM_DURATION) {
  return new Promise(onComplete => {
    TweenLite.to(el, duration/1000, { ...to, onComplete })
  })
}


/**
 * Animate multiple element in sequence
 * @param {NodeList} els 
 * @param {Object} to 
 * @param {Number} duration 
 * @param {Number} delay 
 * @return {Promise}
 */
export function timeline(els, from, to, duration = ANIM_DURATION, delay = ANIM_DELAY) {
  return new Promise(onComplete => {
    const tl = new TimelineLite({ onComplete })
    tl.staggerFromTo(els, duration/1000, from, to, delay/1000)
  })
}