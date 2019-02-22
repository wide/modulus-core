import Component from 'modulus/component'
import { slideDown, slideUp } from '~/utils/dom'


/**
 * Accordion Component
 * 
 * Based on the following template:
 *   <div class="accordion" data-mod="Accordion">
 *     <button class="accordion_trigger" id="trigger-1" aria-expanded="false" aria-controls="body-1">Trigger 1</button>
 *     <div class="accordion_body" id="body-1" role="region" aria-labelledby="trigger-1" hidden>
 *       <div class="ns-accordion-content">
 *         Body 1
 *       </div>
 *     </div>
 *   </div>
 */
export default class Accordion extends Component {

  onInit() {
    this.triggers = this.el.querySelectorAll('[aria-controls]')
    this.triggers.forEach(t => t.addEventListener('click', e => this.toggle(t)))
  }

  toggle(trigger) {
    const target = this.getTarget(trigger)
    if(this.isClose(trigger, target)) this.open(trigger, target)
    else this.close(trigger, target)
  }

  getTarget(trigger) {
    const id = trigger.getAttribute('aria-controls')
    return document.getElementById(id)
  }

  isClose(trigger, target) {
    return target.hidden
  }

  open(trigger, target) {
    trigger.setAttribute('aria-expanded', true)
    target.hidden = false
    slideDown(target, ANIM_DURATION)
  }

  close(trigger, target) {
    trigger.setAttribute('aria-expanded', false)
    slideUp(target, ANIM_DURATION).then(e => target.hidden = true)
  }

}