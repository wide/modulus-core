/**
 * Logger factory
 * @param {String} prefix 
 */
export default function(prefix = '') {

  const logger = function(...args) {
    console.debug(prefix, ...args)
  }

  logger.info = function(...args) {
    console.log(prefix, ...args)
  }

  logger.warn = function(...args) {
    console.warn(prefix, ...args)
  }

  logger.error = function(...args) {
    console.error(prefix, ...args)
  }

  return logger
}