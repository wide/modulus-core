"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toCamel = toCamel;
exports.randomHash = randomHash;
/**
 * Transform hypen-case to camelCase
 * @param {String} string 
 * @param {Boolean} capitalize first letter 
 */
function toCamel(string) {
  var capitalize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var camelized = string.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
  return capitalize ? camelized.charAt(0).toUpperCase() + camelized.slice(1) : camelized;
}

/**
 * Generate a random hash
 * @return {String}
 */
function randomHash() {
  return Math.random().toString(36).substring(7);
}
//# sourceMappingURL=string.js.map