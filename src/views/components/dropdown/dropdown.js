import Component from 'modulus/component'
import CustomEvent from '~/utils/custom-event'
import { slideUp, slideDown } from '~/utils/dom'
import hotkeys from 'hotkeys-js'

export default class extends Component {


  /**
   * Initialize component
   */
  onInit() {
    this.isOpen = false
    this.items = []
    this.render()
    this.listen()
  }


  /**
   * Generate dropdown options and listeners
   */
  render() {

    // clean options
    this.refs.list.innerHTML = ''
    this.items = []

    // create list's items
    for(let i = 0; i < this.refs.select.options.length; i++) {

      // create item button (show option text and update value)
      const btn = document.createElement('button')
      btn.classList.add('dropdown_item')
      btn.value = this.refs.select.options[i].value
      btn.innerHTML = this.refs.select.options[i].text

      // update value on item button click
      btn.addEventListener('click', e => this.change(btn.value, true))
      this.items.push(btn)

      // create <li> containing the button
      const item = document.createElement('li')
      item.appendChild(btn)

      // add item to list
      this.refs.list.appendChild(item)
    }

    // set current
    this.change(this.refs.select.value)
  }


  /**
   * Listen multiple events
   */
  listen() {

    // update from <select>
    this.refs.select.addEventListener('change', e => this.change(this.refs.select.value))

    // toggle list on current button click
    this.refs.current.addEventListener('click', e => this.toggle())

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
    slideDown(this.refs.list)
    this.el.classList.add('-open')
    this.refs.current.setAttribute('aria-expanded', true)

    // focus first item
    this.refs.list.querySelector('.dropdown_item').focus()
  }


  /**
   * Close list and remove `-open` to dropdown element
   */
  close() {

    // ignore if already close
    if(!this.isOpen) return;

    // close list
    this.isOpen = false
    slideUp(this.refs.list)
    this.el.classList.remove('-open')
    this.refs.current.setAttribute('aria-expanded', false)

    // focus current
    this.refs.current.focus()
  }


  /**
   * Update <select> value and trigger `change` event
   * @param {String} value
   * @param {Boolean} notify
   */
  change(value, notify = false) {

    // update dropdown
    this.refs.current.innerHTML = Array.from(this.refs.select.options).find(o => o.value === value).text

    // update <select> value
    this.refs.select.value = value
    if(notify) {
      this.refs.select.dispatchEvent(new CustomEvent('change'))
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

}