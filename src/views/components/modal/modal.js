import Component from 'modulus/component'
import { ANIM_DURATION } from '~/consts'
import hotkeys from 'hotkeys-js'

export default class extends Component {


  /**
   * Initialize component 
   */
  onInit() {

    this.isOpen = false
    this.src = null

    // toggle on local event
    this.on('open', src => this.open(src))
    this.on('close', src => this.close())

    // close en button click or shadow click
    this.refs.close.addEventListener('click', e => this.close())
    this.refs.shadow.addEventListener('click', e => this.close())

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
    this.el.classList.add('-open')
    setTimeout(() => this.el.classList.add('-active'), 25)

    this.$emit('modal.open')
    this.$scroll.lock(this.el)

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
    this.el.classList.remove('-active')
    setTimeout(() => {

      this.el.classList.remove('-open')

      this.$emit('modal.close')
      this.$scroll.unlock()

      if(this.src) {
        this.src.focus()
        this.src = null
      }
    }, ANIM_DURATION)
  }

}