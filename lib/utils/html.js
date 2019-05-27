'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeHtml = escapeHtml;
exports.unescapeHtml = unescapeHtml;
/**
 * Escape HTML Entities
 * @param {String} str
 * @returns {String}
 */
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Unescape HTML Entities
 * @param {String} str
 * @returns {String}
 */
function unescapeHtml(str) {
  return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}
//# sourceMappingURL=html.js.map