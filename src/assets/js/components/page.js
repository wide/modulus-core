import { Component } from 'modulus'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock' 
import { BREAKPOINTS } from '~/vars'

export default class Page extends Component {

  onInit() {

    // lock or unlock body
    this.$on('body.lock', target => disableBodyScroll(target))
    this.$on('body.unlock', e => clearAllBodyScrollLocks())

    // spread breakpoint change
    this.breakpoint = BREAKPOINTS.xs
    window.addEventListener('resize', e => this.dispatchBreakpoint(window.innerWidth))
  }


  /**
   * Watch screen width and dispatch event is breakpoint changes
   */
  dispatchBreakpoint(width) {

    // resolve breakpoint
    let breakpoint = null
    for(let bp in BREAKPOINTS) {
      if(width >= BREAKPOINTS[bp]) breakpoint = bp
    }

    // if breakpoint has changed -> dispatch event
    if(breakpoint !== this.breakpoint) {
      this.breakpoint = breakpoint
      this.$emit('breakpoint', window.innerWidth, breakpoint)
    }
  }

}