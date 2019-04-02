import Pjax from 'pjax'

export default class Pager {

  constructor({ config, container, transitions, fallback = 'noop' }) {

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

    if(!this.pjax) {

      // create pjax instance
      this.pjax = new Pjax({
        selectors: [this.container],
        switches: {
          'body': (oldEl, newEl, opts) => this.onSwitch(oldEl, newEl, opts),
          [this.container]: (oldEl, newEl, opts) => this.onSwitch(oldEl, newEl, opts)
        }
      })
      document.addEventListener('pjax:send', e => this.onLoading(e))
    }

  }


  onLoading(e) {

    console.log('onLoading', e)
    document.body.classList.remove('-loaded')
    document.body.classList.add('-loading')

    // specific transition
    if(e.triggerElement) {
      const name = e.triggerElement.getAttribute(this.config.transitionAttr)
      this.transition = this.transitions[name || this.fallback]
    }

    // fallback transition
    if(!this.transition) {
      this.transition = this.transitions[this.fallback]
    }

    // start transition
    this.loading = this.transition.loading(this.el) // assume promise
  }


  onSwitch(oldEl, newEl, opts) {

    console.log('onSwitch')
    this.loading.then(() => {
      oldEl.innerHTML = newEl.innerHTML
      this.pjax.onSwitch()
      this.onLoaded()
    })
  }


  onLoaded() {

    console.log('onLoaded')
    document.body.classList.remove('-loading')
    document.body.classList.add('-loaded')

    this.loading
      .then(this.transition.loaded(this.el)) // assume promise
      .then(() => {
        this.transition = null
        this.loading = null
      })
  }


  /**
   * Deconnect plugin
   */
  onDestroy() {

  }

}