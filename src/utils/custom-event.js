/**
 * CustomEvent polyfill
 * @param {String} name 
 * @param {Object} params 
 * @return {Boolean}
 */
export default function(name, params = {}) {

  // helper to trigger custom event
  this.trigger = (el, name, params) => el.dispatchEvent(name, params)

  // modern browsers
  if(typeof Event === 'function') {
    return new Event(name, params)
  }

  // ie11
  const event = document.createEvent('Event')
  event.initEvent(name, params.bubbles, params.cancelable)
  return event
}