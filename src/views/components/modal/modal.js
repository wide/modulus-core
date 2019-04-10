import Component from 'modulus/component'
import { ANIM_DURATION } from '~/consts'

export default class extends Component {


  /**
   * Initialize component 
   */
  onInit() {

    this.isOpen = false

    // close en button click
    this.refs.close.addEventListener('click', e => this.close())

    // close on shadow click
    this.refs.shadow.addEventListener('click', e => this.close())

    // close on ESC keydown
    document.addEventListener('keydown', e => {
      if(e.key === 27 || e.key === 'Escape' || e.key === 'Esc') this.close()
    })
  }


  /**
   * Open modal
   */
  open() {

    // ignore if already open
    if(this.isOpen) return;
    this.isOpen = true

    this.el.classList.add('-open')
    setTimeout(() => this.el.classList.add('-active'), 25)
    this.$emit('modal.open')
    this.$scroll.lock(this.refs.close)
  }


  /**
   * Close modal
   */
  close() {

    // ignore if already close
    if(!this.isOpen) return;
    this.isOpen = false

    this.el.classList.remove('-active')
    setTimeout(() => {
      this.el.classList.remove('-open')
      this.$emit('modal.close')
      this.$scroll.unlock()
    }, ANIM_DURATION)
  }

}