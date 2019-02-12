import Component from 'modulus/component'
import Viewport from 'modulus/plugins/viewport'

export default class Intersection extends Component {

  onInit() {

    Viewport.observe({
      target: this.el.querySelectorAll('[data-src]'),
      callback: el => el.src = el.dataset.src
    })

  }

}