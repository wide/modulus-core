import TweenLite from 'gsap/TweenLite'
import TimelineLite from 'gsap/TimelineLite'
import 'gsap/CSSPlugin'

const DEFAULT_DURATION = 400
const DEFAULT_STAGGER = 40


/**
 * Hide element with slide effect bottom to top
 * @param {HTMLElement} el
 * @param {Number} duration ms
 * @return {Promise}
 */
export function slideUp(el, duration = DEFAULT_DURATION) {
  return new Promise(onComplete => {
    TweenLite.set(el, { overflow: 'hidden' })
    TweenLite.to(el, duration/1000, { height: 0, display: 'none', onComplete })
  })
}


/**
 * Show element with slide effect top to bottom
 * @param {HTMLElement} el
 * @param {Number} duration ms
 * @return {Promise}
 */
export function slideDown(el, duration = DEFAULT_DURATION) {
  return new Promise(onComplete => {
    TweenLite.set(el, { overflow: 'hidden', height: 'auto', display: 'block' })
    TweenLite.from(el, duration/1000, { height: 0, onComplete })
  })
}


/**
 * Hide or shor element with slide effect
 * @param {HTMLElement} el
 * @param {Number} duration ms
 * @returns {Promise}
 */
export function slideToggle(el, duration = DEFAULT_DURATION) {
  return (window.getComputedStyle(el).display === 'none')
    ? slideDown(el, duration)
    : slideUp(el, duration)
}


/**
 * Animate elements
 * @param {HTMLElement|NodeList} els 
 * @param {Object} to 
 * @param {Number} duration 
 * @param {Number} stagger 
 * @return {Promise}
 */
export function animate(els, to, duration = DEFAULT_DURATION, stagger = DEFAULT_STAGGER) {
  return new Promise(onComplete => {
    const target = Number.isInteger(els.length) ? els : [els]
    new TimelineLite({ onComplete }).staggerTo(target, duration/1000, to, stagger/1000)
  })
}


/**
 * Animate elements from specific props
 * @param {HTMLElement|NodeList} els 
 * @param {Object} from
 * @param {Object} to 
 * @param {Number} duration 
 * @param {Number} stagger 
 * @return {Promise}
 */
export function animateFrom(els, from, to, duration = DEFAULT_DURATION, stagger = DEFAULT_STAGGER) {
  return new Promise(onComplete => {
    const target = Number.isInteger(els.length) ? els : [els]
    new TimelineLite({ onComplete }).staggerFromTo(target, duration/1000, from, to, stagger/1000)
  })
}


/**
 * Get the first focusable in element
 * @param {HTMLElement} el 
 * @return {NodeList}
 */
export function getFocusables(el) {
  return el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
}


/**
 * Get element position in viewport
 * false -> out of viewport
 * 0..100 -> in viewport
 * @param {HTMLElement} el 
 * @return {Float}
 */
export function inViewport(el) {
  const r = el.getBoundingClientRect()
  return ((r.top + r.height) >= 0 && r.top <= window.innerHeight)
    ? (r.top + r.height) * 100 / (window.innerHeight + r.height)
    : false
}