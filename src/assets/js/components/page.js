import Component from 'modulus/component'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock' 

export default class Page extends Component {

  onInit() {

    // lock or unlock body
    this.$on('body.unlock', e => clearAllBodyScrollLocks())
    this.$on('body.lock', ...targets => {
      for(let i = 0; i < targets.lenght; i++) disableBodyScroll(targets[i])
    })
  }

}