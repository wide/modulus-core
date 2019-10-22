/**
 * Escape HTML Entities
 * @param {String} str
 * @returns {String}
 */
export function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Unescape HTML Entities
 * @param {String} str
 * @returns {String}
 */
export function unescapeHtml(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}


/**
 * Generate unique id of element
 * @param {HTMLElement} el 
 * @return {String}
 */
export function getUID(el) {
  let uid = el.getAttribute('data-mod') || el.tagName.toLowerCase()
  if(el.id) uid += `#${el.id}`
  return uid
}


/**
 * Get element attributes
 * @param {HTMLElement} el 
 * @return {Object}
 */
export function getAttrs(el) {
  const attrs = {}
  for(let i = 0; i < el.attributes.length; i++) {
    attrs[el.attributes[i]] = el.getAttribute(el.attributes[i])
  }
  return attrs
}