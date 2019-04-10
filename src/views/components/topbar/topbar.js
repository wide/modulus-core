import Component from 'modulus/component'

export default class extends Component {


  /**
   * Initialize component 
   */
  onInit() {

    // hide on scroll down, show on scroll up 
    this.$on('scroll', e => {
      this.el.classList.toggle('-hide', e.down)
    })
    
  }

}