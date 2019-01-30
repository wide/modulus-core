import { Component } from 'modulus'

export default class Clickable extends Component {

  onInit() {

    this.n = 0
    this.el.addEventListener('click', e => {
      this.el.innerText = `clicked ${++this.n}`
    })

  }

  onDestroy() {
    this.log('destroyed')
  }

}