import Plugin from '../plugin'
import hotkeys from 'hotkeys-js'

const DEFAULT_CLASSES = {
  parent:     'form-line',
  required:   '-required',
  empty:      '-empty',
  touched:    '-touched',
  changed:    '-changed',
  submitted:  '-submitted',
  invalid:    '-invalid'
}

export default class Form extends Plugin {

  constructor(classes) {
    super()
    this.classes = Object.assign(DEFAULT_CLASSES, classes)
  }


  /**
   * Build plugin necessities
   */
  onInit() {
    this.listenForms(document.body)
    this.$on('dom.updated', root => this.listenForms(root))
  }


  /**
   * Watch all present forms
   */
  listenForms(root) {
    const forms = root.querySelectorAll('form')
    for(let i = 0; i < forms.length; i++) {
      this.watchForm(forms[i])
    }
  }


  /**
   * Watch specific form
   * @param {HTMLElement} form 
   */
  watchForm(form) {
    
    // get relative inputs
    const els = form.querySelectorAll('input, textarea, select')

    // set initial required state
    for(let i = 0; i < els.length; i++) {
      if(els[i].required) this.setState(els[i], this.classes.required)
    }

    // initial form check
    this.checkState(form)
    form.addEventListener('reset', e => {
      this.checkState(form)
    })

    // watch children
    els.forEach(el => {

      // check validity
      ['keyup', 'click', 'blur'].forEach(event => {
        el.addEventListener(event, e => {
          this.setState(el, this.classes.touched)
          this.checkState(el)
          this.setState(form, this.classes.touched)
          this.checkState(form)
        })
      })

      // add -changed when value changes
      el.addEventListener('change', e => {
        this.setState(el, this.classes.changed)
        this.checkState(el)
        this.setState(form, this.classes.changed)
        this.checkState(form)
      })

      // check submit
      hotkeys('enter', { element: el }, e => {
        this.setState(form, this.classes.submitted)
      })

      // initial check
      this.checkState(el)
    })

    // watch submit
    const btn = form.querySelector('[type=submit]')
    if(btn) btn.addEventListener('click', e => {
      this.setState(form, this.classes.submitted)
    })
  }


  /**
   * Set state to input, parent
   * @param {HTMLElement} el 
   * @param {String} state 
   * @param {Boolean} add 
   */
  setState(el, state, add = true) {
    el.classList[add ? 'add' : 'remove'](state)
    const parent = el.closest(`.${this.classes.parent}`)
    if(parent) {
      parent.classList[add ? 'add' : 'remove'](state)
    }
  }


  /**
   * Check empty/invalid input state
   * @param {HTMLElement} el 
   */
  checkState(el) {
    if(!(el instanceof HTMLFormElement)) {
      this.setState(el, this.classes.empty, !!el.value)
    }
    this.setState(el, this.classes.invalid, !el.checkValidity())
  }

}