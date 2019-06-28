import Component              from '../component'
import CustomEvent            from '../utils/custom-event'
import { slideUp, slideDown } from '../utils/dom'
import hotkeys                from 'hotkeys-js'

export const DEFAULT_CLASSES = {
  list: 'dropdown_list',
  current: 'dropdown_current',
  item: 'dropdown_item',
  open: '-open'
}

export default class extends Component {


  /**
   * Initialize component
   */
  onInit(classes) {

    // props
    this.isOpen = false
    this.items = []
    this.classes = classes || DEFAULT_CLASSES
    this.els = {
      list: this.el.querySelector(`.${this.classes.list}`),
      current: this.el.querySelector(`.${this.classes.current}`),
      select: this.el.querySelector('select')
    }

    this.render()
    this.listen()
  }


  /**
   * Generate dropdown options and listeners
   */
  render() {

    // clean options
    this.els.list.innerHTML = ''
    this.items = []

    // create list's items
    for(let i = 0; i < this.els.select.options.length; i++) {

      // create item button (show option text and update value)
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.classList.add(this.classes.item)
      btn.value = this.els.select.options[i].value
      btn.innerHTML = this.els.select.options[i].text

      // update value on item button click
      btn.addEventListener('click', e => this.change(btn.value, true))
      this.items.push(btn)

      // create <li> containing the button
      const item = document.createElement('li')
      item.appendChild(btn)

      // add item to list
      this.els.list.appendChild(item)
    }

    // set current
    this.change(this.els.select.value)
  }


  /**
   * Listen multiple events
   */
  listen() {

    // update from <select>
    this.els.select.addEventListener('change', e => this.change(this.els.select.value))

    // toggle list on current button click
    this.els.current.addEventListener('click', e => this.toggle())

    // navigate using keyboard
    hotkeys('up', e => this.moveFocus(true, e))
    hotkeys('down', e => this.moveFocus(false, e))

    // close on blur (click outside)
    document.addEventListener('click', this.closeOnBlur.bind(this))
  }


  /**
   * When element is removed from DOM
   */
  onDestroy() {
    document.removeEventListener('click', this.closeOnBlur.bind(this))
  }


  /**
   * Open or close based on current state
   */
  toggle() {
    if(this.isOpen) this.close()
    else this.open()
  }


  /**
   * Open list and add `-open` to dropdown element
   */
  open() {

    // ignore if already open
    if(this.isOpen) return;

    // open list
    this.isOpen = true
    slideDown(this.els.list)
    this.el.classList.add(this.classes.open)
    this.els.current.setAttribute('aria-expanded', true)

    // focus first item
    this.els.list.querySelector(`.${this.classes.item}`).focus()
  }


  /**
   * Close list and remove `-open` to dropdown element
   */
  close() {

    // ignore if already close
    if(!this.isOpen) return;

    // close list
    this.isOpen = false
    slideUp(this.els.list)
    this.el.classList.remove(this.classes.open)
    this.els.current.setAttribute('aria-expanded', false)

    // focus current
    this.els.current.focus()
  }


  /**
   * Update <select> value and trigger `change` event
   * @param {String} value
   * @param {Boolean} notify
   */
  change(value, notify = false) {

    // update dropdown
    this.els.current.innerHTML = Array.from(this.els.select.options).find(o => o.value === value).text

    // update <select> value
    this.els.select.value = value
    if(notify) {
      this.els.select.dispatchEvent(new CustomEvent('change'))
    }

    // spread component event
    this.emit('change')

    // close list
    this.close()
  }


  /**
   * Move focus between options
   * @param {Boolean} up
   * @param {Event} e
   */
  moveFocus(up, e) {

    // stop event
    e.stopPropagation()

    // get current index
    let index = this.items.findIndex(item => item === document.activeElement)

    // define new index
    if(index === -1) index = 0 // no focus yet, set first
    else if(up && index > 0) index-- // move up
    else if(!up && index < (this.items.length - 1)) index++

    // set focus on new index
    this.items[index].focus()

    return false
  }


  /**
   * Listen click on outside of dropdown and close
   */
  closeOnBlur(e) {
    if(this.el !== e.target && !this.el.contains(e.target)) {
      this.close()
    }
  }


  /**
   * Create slider not as a component
   * @param {HTMLElement} el 
   * @param {Object} classes 
   */
  static create(el, classes) {
    const instance = new this(el, {})
    instance.onInit(classes)
    return instance
  }

}