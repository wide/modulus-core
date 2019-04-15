import Component from 'modulus/component'
import { slideDown, slideUp } from '~/utils/dom'
import { ANIM_DURATION } from '~/consts'


/**
 * Accordion Component
 */
export default class Accordion extends Component {

  /**
   * Initialize accordion component
   */
  onInit() {
    this.triggers = this.el.querySelectorAll('[aria-controls]')
    for(let i = 0; i < this.triggers.length; i++) {
      this.listenTrigger(this.triggers[i])
    }
  }


  /**
   * Listen click event and toggle to related target
   * @param {HTMLElement} trigger 
   */
  listenTrigger(trigger) {
    trigger.addEventListener('click', e => this.toggle(trigger))
  }


  /**
   * Toggle both trigger and related target
   * @param {HTMLElement} trigger 
   * @return {Promise}
   */
  toggle(trigger) {
    const target = this.getTarget(trigger)
    return this.isClose(trigger, target)
      ? this.open(trigger, target)
      : this.close(trigger, target)
  }


  /**
   * Get trigger's relatied target based on `aria-controls` attribute
   * @param {HTMLELement} trigger 
   * @return {HTMLElement}
   */
  getTarget(trigger) {
    const id = trigger.getAttribute('aria-controls')
    return document.getElementById(id)
  }


  /**
   * Check close state of a specific trigger
   * @param {HTMLElement} trigger 
   * @param {HTMLElement} target 
   * @return {Bool}
   */
  isClose(trigger, target) {
    return target.hidden
  }


  /**
   * Open specific trigger and target
   * @param {HTMLElement} trigger 
   * @param {HTMLElement} target 
   * @return {Promise}
   */
  open(trigger, target) {
    trigger.setAttribute('aria-expanded', true)
    target.hidden = false
    return slideDown(target, ANIM_DURATION)
  }


  /**
   * Close specific trigger and target
   * @param {HTMLElement} trigger 
   * @param {HTMLElement} target 
   * @return {Promise}
   */
  close(trigger, target) {
    trigger.setAttribute('aria-expanded', false)
    return slideUp(target, ANIM_DURATION).then(e => target.hidden = true)
  }

}