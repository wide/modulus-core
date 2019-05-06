import Manager from './manager'

export default class WebStorage extends Manager {
  constructor(storage = 'session') {
    super()
    this.storage = storage.toLowerCase().trim()
  }

  /**
   * Get storage object
   * @returns {Object} localStorage or sessionStorage
   */
  parser() {
    if (this.storage === 'session') {
      return window.sessionStorage
    }
    return window.localStorage
  }

  /**
   * Delete all values present in the storage
   */
  clear() {
    this.parser().clear()
  }

  /**
   * Get an item from its key
   * @param {String} key
   * @returns {Object|String|undefined}
   */
  get(key) {
    const string = this.parser().getItem(key) || undefined
    try {
      return JSON.parse(string)
    } catch (error) {
      return string
    }
  }

  /**
   * Add an item from its key and value
   * @param {String} key
   * @param {*} object
   */
  set(key, object) {
    if (typeof object === 'string') {
      this.parser().setItem(key, object)
    } else {
      this.parser().setItem(key, JSON.stringify(object))
    }
  }

  /**
   * Delete an item from its key
   * @param {String} key
   */
  unset(key) {
    try {
      this.parser().removeItem(key)
    } catch (error) {
      this.parser().removeItem('')
    }
  }
}