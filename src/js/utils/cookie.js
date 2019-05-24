/**
 * Set expires for cookie
 * @param {string} cookie
 * @return {String}
 */
export function setExpires(cookie) {
  return cookie
    .replace(/^ +/, '')
    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
}
