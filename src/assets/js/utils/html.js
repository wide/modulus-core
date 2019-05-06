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
 * Get element data attributes
 * @param {DOMElement} node
 * @returns {Array} data
 */
export function getNodeData(node) {
  // all attributes
  const attributes = node.attributes

  // regex Pattern
  const pattern = /^data\-(.+)$/

  // output
  const data = {}

  for (let i in attributes) {
    if (!attributes[i]) {
      continue
    }

    // attributes name (ex: data-module)
    let name = attributes[i].name
    if (!name) {
      continue
    }

    let match = name.match(pattern)
    if (!match) {
      continue
    }

    // if this throws an error, you have some
    // serious problems in your HTML
    data[match[1]] = getData(node.getAttribute(name))
  }

  return data
}