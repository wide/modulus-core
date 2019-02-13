import Component from 'modulus/component'
import viewport from 'modulus/plugins/viewport'

export default class Intersection extends Component {

  onInit() {

    viewport.observe({
      target: this.el.querySelectorAll('[data-src]'),
      callback: el => el.src = el.dataset.src
    })

  }

}