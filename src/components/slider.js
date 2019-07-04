import Component from '../component'
import Swiper from 'swiper'
import hotkeys from 'hotkeys-js'

export const DEFAULT_CONFIG = {
  loop: true,
  autoplay: true,
  spaceBetween: 40,
  slidesPerView: 3
}

export const DEFAULT_CLASSES = {
  prev: 'swiper-button-prev',
  next: 'swiper-button-next',
  pagination: 'swiper-pagination',
  bullets: 'swiper-pagination-bullet',
  bulletActive: 'swiper-pagination-bullet-active',
  slide: 'swiper-slide',
  slideVisible: 'swiper-slide-visible',
  slideActive: 'swiper-slide-active',
}

export default class extends Component {


  /**
   * Initialize slider
   * @param {Object} config 
   * @param {Object} classes 
   */
  onInit(config, classes) {

    // props
    this.manualChange = false
    this.arialLabels = {
      prevSlide: this.el.dataset.prevslidemessage || 'Previous slide',
      nextSlide: this.el.dataset.nextslidemessage || 'Next slide',
      paginationBullet: this.el.dataset.paginationmessage || 'Go to slide',
      paginationBulletActive: this.el.dataset.currentslidemessage || '(current slide)'
    }

    // swiper config
    this.config = config || DEFAULT_CONFIG
    this.classes = classes || DEFAULT_CLASSES

    // controls
    this.els = {
      prev: this.el.querySelector(`.${this.classes.prev}`),
      next: this.el.querySelector(`.${this.classes.next}`),
      pagin: this.el.querySelector(`.${this.classes.pagination}`),
      bullets: this.el.querySelectorAll(`.${this.classes.bullets}`)
    }

    // instanciate slider
    this.createSlider()
    this.enableKeyboardNav()
    this.flagManualChange()
    this.onSlideChange()

    // compute visibility and focus on slide change
    this.instance.on('transitionEnd', () => this.onSlideChange())
  }


  /**
   * Instanciate Swiper
   */
  createSlider() {

    // set default necessary config values
    this.config.watchSlidesVisibility = true
    this.config.navigation = this.config.navigation || {
      prevEl: `.${this.classes.prev}`,
      nextEl: `.${this.classes.next}`
    }
    this.config.pagination = this.config.pagination || {
      el: `.${this.classes.pagination}`,
      type: 'bullets',
      bulletElement: 'button',
      clickable: true
    }
    this.config.a11y = this.config.a11y || {
      prevSlideMessage: this.arialLabels.prevSlide,
      nextSlideMessage: this.arialLabels.nextSlide,
      paginationBulletMessage: this.arialLabels.paginationBullet + ' {{index}}'
    }

    // instanciate with config
    this.instance = new Swiper(this.el, this.config)
  }


  /**
   * Overide keyboard navigation (swiper's native has too many issues)
   */
  enableKeyboardNav() {
    hotkeys('left,right', (e, { key }) => {
      if (this.el === e.target || this.el.contains(e.target)) {
        this.manualChange = true
        if (key === 'left') this.instance.slidePrev()
        if (key === 'right') this.instance.slideNext()
      }
    })
  }


  /**
   * Re-affect visibility and focus for accessibility purpose
   */
  onSlideChange() {

    // set aria-hidden and tabindex
    const slides = this.el.querySelectorAll(`.${this.classes.slide}`)
    for (let i = 0; i < slides.length; i++) {

      // to slide
      const isVisible = slides[i].classList.contains(`.${this.classes.slideVisible}`)
      slides[i].setAttribute('aria-hidden', !isVisible)
      slides[i].setAttribute('tabindex', isVisible ? 0 : -1)

      // and to its focusable content
      const focusables = slides[i].querySelectorAll('a, button')
      for (let j = 0; j < focusables.length; j++) {
        focusables[j].setAttribute('aria-hidden', !isVisible)
        focusables[j].setAttribute('tabindex', isVisible ? 0 : -1)
      }
    }

    // set focus on active slide
    if (this.manualChange) {
      this.el.querySelector(`.${this.classes.slideActive}`).focus()
      this.manualChange = false
    }

    // set pagin bullet label
    for(let i = 0; i < this.els.bullets.length; i++) {
      const label = this.els.bullets[i].classList.contains(this.classes.bulletActive)
        ? `${this.arialLabels.paginationBullet} ${i+1} ${this.arialLabels.paginationBulletActive}`
        : `${this.arialLabels.paginationBullet} ${i+1}`
      this.els.bullets[i].setAttribute('aria-label', label)
    }

    // emit event
    this.emit('slide.change')
  }


  /**
   * Set manual change flag on specific actions
   */
  flagManualChange() {
    this.instance.on('touchEnd', e => this.manualChange = true)
    for (let prop in this.els) {
      if (this.els[prop] instanceof HTMLElement) {
        this.els[prop].addEventListener('click', e => this.manualChange = true)
      }
    }
  }


  /**
   * Create slider not as a component
   * @param {HTMLElement} el 
   * @param {Object} config 
   * @param {Object} classes 
   */
  static create(el, config, classes) {
    const instance = new this(el, {})
    instance.onInit(config, classes)
    return instance
  }

}