import Component from 'modulus/component'
import Swiper from 'swiper'

export default class extends Component {


  /**
   * Initialize component 
   */
  onInit() {
    this.swiper = new Swiper(this.refs.container, {
      loop: true
    })
  }

}