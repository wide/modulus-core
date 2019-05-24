import Plugin from '../plugin'
import hotkeys from 'hotkeys-js'

export default class Form extends Plugin {


  /**
   * Build plugin necessities
   */
  onInit() {
    this.forms = []
    this.listenForms()
  }


  /**
   * Watch all present forms
   */
  listenForms() {
    this.forms = document.body.querySelectorAll('form')
    this.forms.forEach(form => this.watchForm(form))
  }


  /**
   * Watch specific form
   * @param {HTMLElement} form 
   */
  watchForm(form) {
    
    const els = form.querySelectorAll('input, textarea, select')

    // initial form check
    this.checkFormState(form)
    form.addEventListener('reset', e => {
      this.setSubmitted(form, els)
      this.checkFormState(form)
    })

    // watch children
    els.forEach(el => {

      // check validity
      ['keyup', 'blur'].forEach(event => {
        el.addEventListener(event, e => {
          el.classList.add('-touched')
          form.classList.add('-touched')
          this.checkState(el)
          this.checkFormState(form)
        })
      })

      // add -changed when value changes
      el.addEventListener('change', e => {
        el.classList.add('-changed')
        form.classList.add('-changed')
        this.checkState(el)
        this.checkFormState(form)
      })

      // check submit
      hotkeys('enter', { element: el }, e => {
        this.setSubmitted(form, els)
      })

      // initial check
      this.checkState(el)
    })

    // watch submit
    const btn = form.querySelector('[type=submit]')
    if(btn) btn.addEventListener('click', e => {
      this.setSubmitted(form, els)
    })
  }


  /**
   * Set whol form as submitted
   * @param {HTMLELement} form 
   * @param {NodeList} els 
   */
  setSubmitted(form, els) {
    form.classList.add('-submitted')
    els.forEach(el => {
      el.blur()
      el.classList.add('-touched')
    })
  }


  /**
   * Check empty/invalid input state
   * @param {HTMLElement} el 
   */
  checkState(el) {
    
    // empty value
    el.classList[el.value ? 'remove' : 'add']('-empty')

    // invalid value
    const isInvalid = !el.checkValidity()
    el.classList[isInvalid ? 'add' : 'remove']('-invalid')
  }


  /**
   * Check invalid form state
   * @param {HTMLElement} form 
   */
  checkFormState(form) {
    const isInvalid = !form.checkValidity()
    form.classList[isInvalid ? 'add' : 'remove']('-invalid')
  }

}