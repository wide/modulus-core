import Plugin from '../plugin'
import Pjax from 'pjax'

export default class Router extends Plugin {

  constructor({ config, transitions, container = 'main', fallback = 'noop' }) {
    super()

    this.container = container
    this.transitions = transitions
    this.fallback = fallback
    this.config = config

    this.transition = null
    this.loading = null
    this.el = document.querySelector(this.container)
  }


  /**
   * Build plugin necessities
   */
  onInit() {

    // do not load pjax if browse from local files
    if(location.protocol === 'file:') {
      this.log.error('cannot load PJax on file:// protocol, please setup a web server')
      return
    }

    // instanciate pjax
    this.pjax = new Pjax({
      selectors: ['title', this.container],
      switches: {
        [this.container]: (before, after, opts) => this.onSwap(before, after, opts)
      },
      cacheBust: false,
      //debug: this.$modulus.config.debug
    })

    // listen globally for start event
    document.addEventListener('pjax:send', e => this.onLoading(e))

    // listen globally for error
    document.addEventListener('pjax:error', err => this.onError(err))

    // add initial class on body
    document.body.classList.add('-loaded')
  }


  /**
   * Change url
   * @param {String} url
   * @param {Object} opts
   */
  go(url, opts) {
    if(this.pjax) this.pjax.loadUrl(url, opts)
    else location.href = url
  }


  /**
   * Transition is starting
   * @param {Object} e
   */
  onLoading(e) {

    // change body classes
    document.body.classList.remove('-loaded')
    document.body.classList.add('-loading')

    // resolve transition name
    let name = null

    // transition from go() method
    if(e.transition) {
      name = e.transition
    }
    // transition from element attribute
    else if(e.triggerElement) {
      name = e.triggerElement.dataset.transition
    }

    // default transition name
    if(!this.transitions[name]) {
      name = this.fallback
    }

    // get transition by name
    this.transition = this.transitions[name]

    // start transition
    this.log.debug('route change', name)
    this.$emit('route.change', name)
    this.loading = this.transition.enter(this.el) // assume promise
  }


  /**
   * Next page is loaded, replace content
   * @param {HTMLElement} before
   * @param {HTMLElement} after
   * @param {Object} opts
   */
  onSwap(before, after) {
    this.loading.then(() => {

      // replace content
      this.log.debug('dom destroyed')
      this.$emit('dom.destroyed', before)
      before.innerHTML = after.innerHTML

      // rebuild modulus
      this.pjax.onSwitch()

      // end transition
      this.onLoaded()
    })
  }


  /**
   * End transition
   */
  onLoaded() {

    // change body classes
    document.body.classList.remove('-loading')
    document.body.classList.add('-loaded')

    // end transition
    this.log.debug('dom updated')
    this.$emit('dom.updated', this.el)
    this.transition.leave(this.el).then(() => {
      this.transition = null
      this.loading = null
    })
  }


  /**
   * Handle request error
   * @param {Object} err 
   */
  onError(err) {

    // force redirection in any errors
    this.log.error(err)
    location.href = err.request.responseURL
  }

}