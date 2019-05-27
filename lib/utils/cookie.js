'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setExpires = setExpires;
/**
 * Set expires for cookie
 * @param {string} cookie
 * @return {String}
 */
function setExpires(cookie) {
  return cookie.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
}
//# sourceMappingURL=cookie.js.map