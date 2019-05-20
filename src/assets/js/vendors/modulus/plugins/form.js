import Plugin from 'modulus/plugin'

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
    const controls = form.querySelectorAll('input, textarea, select')
    controls.forEach(el => {

      // add -touched when user focus/blur
      el.addEventListener('blur', e => {
        el.classList.add('-touched')
        form.classList.add('-touched')
        this.checkValidity(form, controls)
      })

      // add -changed when value changes
      el.addEventListener('change', e => {
        el.classList.add('-changed')
        form.classList.add('-changed')
        this.checkValidity(form, controls)
      })
    })
  }


  /**
   * Add -invalid if cheValidity fails
   * @param {HTMLElement} form 
   * @param {HTMLElement} controls 
   */
  checkValidity(form, controls) {
    for(let i = 0; i < controls.length; i++) {
      if(!controls[i].checkValidity()) {
        return form.classList.add('-invalid')
      }
    }
    form.classList.remove('-invalid')
  }

}