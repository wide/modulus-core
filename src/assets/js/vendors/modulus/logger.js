/**
 * Logger factory
 * @param {Object} opts 
 * @param {Boolean} opts.active 
 * @param {String} opts.prefix 
 */
export default function({ active, prefix }) {

  const logger = function(...args) {
    if(active) console.log(prefix, ...args)
  }

  logger.info = function(...args) {
    if(active) console.info(prefix, ...args)
  }

  logger.debug = function(...args) {
    if(active) console.debug(prefix, ...args)
  }

  logger.warn = function(...args) {
    if(active) console.warn(prefix, ...args)
  }

  logger.error = function(...args) {
    if(active) console.error(prefix, ...args)
  }

  return logger
}