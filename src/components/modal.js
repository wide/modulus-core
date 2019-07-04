import Component from '../component'
import hotkeys from 'hotkeys-js'

export const DEFAULT_CLASSES = {
  close: 'modal_close',
  shadow: 'modal_shadow',
  open: '-open',
  active: '-active'
}

export default class extends Component {


  /**
   * Initialize component 
   */
  onInit(classes) {

    this.isOpen = false
    this.src = null
    this.classes = classes || DEFAULT_CLASSES
    this.els = {
      close: this.el.querySelector(`.${this.classes.close}`),
      shadow: this.el.querySelector(`.${this.classes.shadow}`)
    }

    // close en button click or shadow click
    this.els.close.addEventListener('click', e => this.close())
    this.els.shadow.addEventListener('click', e => this.close())

    // close on ESC keydown
    hotkeys('esc', e => this.close())
  }


  /**
   * Open modal
   * @param {HTMLElement} src
   */
  open(src) {

    // ignore if already open
    if(this.isOpen) return;
    this.isOpen = true
    this.src = src

    // open modal
    this.el.classList.add(this.classes.open)
    setTimeout(() => this.el.classList.add(this.classes.active), 25)

    // spread event
    this.emit('open')
    this.$emit('body.lock', this.el)

    // set focus inside modal
    this.el.focus()
  }


  /**
   * Close modal
   */
  close() {

    // ignore if already close
    if(!this.isOpen) return;
    this.isOpen = false

    // close modal
    this.el.classList.remove(this.classes.active)
    setTimeout(() => {

      this.el.classList.remove(this.classes.open)

      // spread event
      this.emit('close')
      this.$emit('body.unlock')

      if(this.src) {
        this.src.focus()
        this.src = null
      }
    }, 400)
  }


  /**
   * Create modal not as a component
   * @param {HTMLElement} el 
   * @param {Object} classes 
   */
  static create(el, classes) {
    const instance = new this(el, {})
    instance.onInit(classes)
    return instance
  }

}