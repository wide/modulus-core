import Plugin from 'modulus/plugin'

export default class Form extends Plugin {


  /**
   * Build plugin necessities
   */
  onInit() {
    this.forms = []
    this.listenForms()
  }


  listenForms() {
    this.forms = document.body.querySelectorAll('form')
    this.forms.forEach(form => this.watchForm(form))
  }


  watchForm(form) {
    const controls = form.querySelectorAll('input, textarea, select')
    controls.forEach(el => {

      el.addEventListener('blur', e => {
        el.classList.add('-touched')
        form.classList.add('-touched')
        this.checkValidity(form, controls)
      })

      el.addEventListener('change', e => {
        el.classList.add('-changed')
        form.classList.add('-changed')
        this.checkValidity(form, controls)
      })
    })
  }


  checkValidity(form, controls) {
    for(let i = 0; i < controls.length; i++) {
      if(!controls[i].checkValidity()) {
        return form.classList.add('-invalid')
      }
    }
    form.classList.remove('-invalid')
  }

}