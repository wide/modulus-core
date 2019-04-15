/**
 * CustomEvent polyfill
 * @param {String} name 
 */
export default function(name) {

  if(typeof Event === 'function') {
    return new Event(name)
  }

  // ie11
  const event = document.createEvent('Event')
  event.initEvent(name, true, true)
  return event
}