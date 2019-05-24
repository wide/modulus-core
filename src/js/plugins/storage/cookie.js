import Manager from './manager'
import { setExpires } from '../../utils/cookie'

export default class Cookie extends Manager {
  constructor(params = {}) {
    super()
    this.init(params)
  }

  /**
   * Init settings on cookie
   * @param {Object} params
   */
  init(params = {}) {
    this.params = Object.assign({
      path: '/',    // path of cookie
      expires: 525600  // 365 days = 525600 minutes
    }, params)
  }

  /**
   * Get cookie object
   * @return {Object}
   */
  parser() {
    if (document.cookie === '') {
      return {}
    }
    return document.cookie
      .split('; ')
      .map((value) => value.split('='))
      .reduce((acc, value) => {
        if (value[0] !== undefined && value[0] !== 'undefined' && value[0] !== '') {
          value[1] = (value[1] !== undefined) ? value[1].trim() : ''
          acc[decodeURIComponent(value[0].trim())] = decodeURIComponent(value[1])
        }
        return acc
      }, {})
  }

  /**
   * Delete all values present in the cookie
   */
  clear() {
    document.cookie.split(';').forEach((cookie) => {
      if (cookie !== '') {
        document.cookie = setExpires(cookie)
      }
    })
  }

  /**
   * Get an item from its key
   * @param {String} key
   * @returns {Object|String|undefined}
   */
  get(key) {
    const value = this.parser()[key] || undefined
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  /**
   * Add an item from its key and value
   * @param {String} key
   * @param {*} object
   */
  set(key, object) {
    const date = new Date()
    date.setTime(+ date + (this.params.expires * 60 * 1000))

    object = (typeof object === 'string')
      ? object
      : JSON.stringify(object)

    document.cookie = `${encodeURIComponent(key)}=${decodeURIComponent(
      object
    )};path=${this.params.path};expires=${date.toUTCString()}`
  }

  /**
   * Delete an item from its key
   * @param {String} key
   */
  unset(key) {
    document.cookie = `${encodeURIComponent(key)}=;expires=${new Date().toUTCString()}`
  }
}