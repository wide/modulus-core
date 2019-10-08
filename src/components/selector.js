import Component              from '../component'
import CustomEvent            from '../utils/custom-event'
import { inViewport }         from '../utils/dom'
import hotkeys                from 'hotkeys-js'

export const DEFAULT_CLASSES = {
  main:     'selector',
  current:  'selector_current',
  caret:    'selector_caret',
  list:     'selector_list',
  item:     'selector_item',
  group:    'selector_group',
  label:    'selector_label',
  open:     '-open',
  top:      '-top'
}

export default class extends Component {


  /**
   * Initialize component
   */
  onInit(cfg = {}) {

    this.isOpen = false
    this.items = []
    this.classes = cfg.classes || DEFAULT_CLASSES
    this.threshold = cfg.threshold || 60
    this.els = {}

    this.render()
    this.listen()
    this.change(this.el.value)
  }


  /**
   * Generate selector HTML
   */
  render() {
    const html = this.renderMain()
    this.els.main = this.attachToDOM(html)
    this.els.current = this.els.main.querySelector(`.${this.classes.current}`)
    this.els.list = this.els.main.querySelector(`.${this.classes.list}`)
    this.els.items = Array.from(this.els.list.querySelectorAll(`.${this.classes.item}`))
    this.els.label = document.querySelector(`label[for="${this.el.id}"]`)
  }


  /**
   * Render main HTML
   * @return {String}
   */
  renderMain() {
    return `<button type="button"
                    class="${this.classes.current}"
                    id="${this.el.id}-current"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                    aria-controls="${this.el.id}-list"></button>
      <span class="${this.classes.caret}"></span>
      <ul class="${this.classes.list}"
          id="${this.el.id}-list"
          role="listbox"
          aria-labelledby="${this.el.id}-current">
        ${this.renderItems(this.el.children)}
      </ul>`
  }


  /**
   * Render list HTML
   * @param {Array} items 
   * @return {String}
   */
  renderItems(items) {
    let html = ''
    for(let i = 0; i < items.length; i++) {
      html += (items[i] instanceof HTMLOptGroupElement)
        ? this.renderGroup(items[i])
        : this.renderItem(items[i])
    }
    return html
  }


  /**
   * Render group HTML
   * @param {HTMLElement} optgroup 
   * @return {String}
   */
  renderGroup(optgroup) {
    return `<li>
      <ul class="${this.classes.group}" role="group">
        <li class="${this.classes.label}">${optgroup.label}</li>
        ${this.renderItems(optgroup.children)}
      </ul>
    </li>`
  }


  /**
   * Render option HTML
   * @param {HTMLElement} opt 
   * @return {String}
   */
  renderItem(opt) {
    return `<li>
      <button type="button"
              class="${this.classes.item}"
              value="${opt.value}"
              role="option">${opt.dataset.content || opt.text}</button>
    </li>`
  }


  /**
   * Connect generated HTML into the DOM
   * @param {String} html 
   */
  attachToDOM(html) {

    const main = document.createElement('div')
    main.classList.add(this.classes.main)
    main.innerHTML = html

    this.el.parentNode.insertBefore(main, this.el)
    main.appendChild(this.el)
    return main
  }


  /**
   * Listen multiple events
   */
  listen() {

    // focus on label click
    if(this.els.label) {
      this.els.label.addEventListener('click', e => this.els.current.focus())
    }

    // update from <select>
    this.el.addEventListener('change', e => this.change(this.el.value))

    // update from items
    for(let i = 0; i < this.els.items.length; i++) {
      this.els.items[i].addEventListener('click', e => this.change(this.els.items[i].value, true))
    }

    // toggle list on current button click
    this.els.current.addEventListener('click', e => this.toggle())

    // navigate using keyboard
    hotkeys('up', e => this.moveFocus(true, e))
    hotkeys('down', e => this.moveFocus(false, e))

    // close on ESC key
    hotkeys('esc', e => this.close())

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
    this.isOpen ? this.close() : this.open()
  }


  /**
   * Open list and add `-open` to selector element
   */
  open() {

    // ignore if already open
    if(this.isOpen) return;
    this.isOpen = true

    // should open to top ?
    const onTop = inViewport(this.els.main) >= this.threshold
    this.els.main.classList[onTop ? 'add' : 'remove'](this.classes.top)

    // open list
    this.els.main.classList.add(this.classes.open)
    this.els.current.setAttribute('aria-expanded', true)

    // focus current value
    for(let i = 0; i < this.el.options.length; i++) {
      if(this.el.options[i].selected) {
        this.els.items[i].focus()
      }
    }
  }


  /**
   * Close list and remove `-open` to selector element
   * @param {Boolean} refocus
   */
  close(refocus = true) {

    // ignore if already close
    if(!this.isOpen) return;
    this.isOpen = false

    // close list
    this.els.main.classList.remove(this.classes.open)
    this.els.current.setAttribute('aria-expanded', false)

    // focus current
    if(refocus) {
      this.els.current.focus()
    }
  }


  /**
   * Update <select> value and trigger `change` event
   * @param {String} value
   * @param {Boolean} notify
   */
  change(value, notify = false) {

    // update selector
    const itemCurrent = Array.from(this.el.options).find(o => o.value === value)
    this.els.current.innerHTML = itemCurrent.dataset.content || itemCurrent.text

    // update <select> value
    this.el.value = value
    for(let i = 0; i < this.el.options.length; i++) {
      if(this.el.options[i].value === value) {
        this.el.selectedIndex = i
        this.el.options[i].setAttribute('selected', 'selected')
      }
      else {
        this.el.options[i].removeAttribute('selected')
      }
    }

    // spread component event
    this.emit('change')
    if(notify) {
      this.el.dispatchEvent(new CustomEvent('change'))
    }

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
    let index = this.els.items.findIndex(item => item === document.activeElement)

    // define new index
    if(index === -1) index = 0 // no focus yet, set first
    else if(up && index > 0) index-- // move up
    else if(!up && index < (this.els.items.length - 1)) index++

    // set focus on new index
    this.els.items[index].focus()

    return false
  }


  /**
   * Listen click on outside of selector and close
   */
  closeOnBlur(e) {
    if(this.els.main !== e.target && !this.els.main.contains(e.target)) {
      this.close(false)
    }
  }


  /**
   * Create selector not as a component
   * @param {HTMLElement} el 
   * @param {cfg} classes 
   */
  static create(el, cfg) {
    const instance = new this(el, {})
    instance.onInit(cfg)
    return instance
  }

}