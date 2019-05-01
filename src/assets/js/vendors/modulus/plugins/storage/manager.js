import Plugin from 'modulus/plugin'

export default class Manager extends Plugin {
  /**
   * Get all the values present in the "Cookie / Storage"
   * @returns {Object}
   */
  all() {
    return this.parser()
  }

  /**
   * Add an item "Cookie / Storage" from its key and value
   * @alias set
   * @param {String} key
   * @param {*} value
   */
  create(key, value) {
    this.set(key, value)
  }

  /**
   * Delete an item "Cookie / Storage" from its key
   * @alias unset
   * @param {String} key
   */
  delete(key) {
    this.unset(key)
  }

  /**
   * Get a JSON of all the values present in the "Cookie / Storage"
   * @returns {JSON}
   */
  json() {
    return JSON.stringify(this.parser())
  }
}