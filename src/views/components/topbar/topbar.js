import Component from 'modulus/component'

export default class extends Component {


  /**
   * Initialize component 
   */
  onInit() {
    this.$on('scroll', e => {
      if(e.down && e.value > this.el.offsetHeight) this.el.classList.add('-hide')
      else this.el.classList.remove('-hide')
    })
  }

}