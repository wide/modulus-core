import Plugin from 'modulus/plugin'
import Pjax from 'pjax'

export default class Router extends Plugin {

  constructor({ config, transitions, container = 'main', fallback = 'noop' }) {
    super()

    this.container = container
    this.transitions = transitions
    this.fallback = fallback

    this.transition = null
    this.loading = null
    this.el = document.querySelector(this.container)

    this.config = Object.assign({
      transitionAttr: 'data-transition'
    }, config)
  }


  /**
   * Build plugin necessities
   */
  onInit() {

    // instanciate pjax
    this.pjax = new Pjax({
      selectors: ['title', this.container],
      switches: {
        [this.container]: (before, after, opts) => this.onSwap(before, after, opts)
      },
      cacheBust: false,
      debug: this.$modulus.config.debug
    })

    // listen globally for start event
    document.addEventListener('pjax:send', e => this.onLoading(e))

    // add initial class on body
    document.body.classList.add('-loaded')
  }


  /**
   * Change url
   * @param {String} url 
   * @param {Object} opts 
   */
  go(url, opts) {
    this.pjax.loadUrl(url, opts)
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
      name = e.triggerElement.getAttribute(this.config.transitionAttr)
    }

    // default transition name
    if(!this.transitions[name]) {
      name = this.fallback
    }

    // get transition by name
    this.transition = this.transitions[name]

    // start transition
    this.log('route change', name) 
    this.$emit('route.change', name)
    this.loading = this.transition.loading(this.el) // assume promise
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
      this.log('route destroy')
      this.$emit('route.destroy')
      before.innerHTML = after.innerHTML

      // rebuild modulus
      this.pjax.onSwitch()
      this.$modulus.rebuild(before)

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
    this.log('route loaded')
    this.$emit('route.loaded')
    this.transition.loaded(this.el).then(() => {
      this.transition = null
      this.loading = null
    })
  }

}