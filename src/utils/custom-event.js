/**
 * CustomEvent polyfill
 * @param {String} name
 * @param {Object} params
 * @return {Boolean}
 */
export default function CustomEvent(name, params = {}) {

  // modern browsers
  if (typeof Event === 'function') {
    return new Event(name, params)
  }

  // ie11
  const event = document.createEvent('Event')
  event.initEvent(name, params.bubbles, params.cancelable)
  return event
}

/**
 *
 * @param {HTMLElement} el
 * @param {String} name
 * @param {Object} params
 */
export function fireEvent(el, name, params) {
  el.dispatchEvent(new CustomEvent(name), params)
}