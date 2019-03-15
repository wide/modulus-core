import Component from 'modulus/component'

export default class extends Component {

  onInit() {
    this.log('hello, this is', this.$uid)
  }

}