import Component from 'modulus/component'

export default class extends Component {


  /**
   * Initialize component 
   */
  onInit() {

    // hide on scroll down, show on scroll up 
    this.$on('scroll', e => {
      this.el.classList.toggle('-hide', !this.$router.loading && e.value > 0 && !e.up)
    })
    
    // open menu on burger click
    this.refs.burger.addEventListener('click', e => this.toggleMenu())

    // close menu on body click
    document.addEventListener('click', e => {
      if(!this.el.contains(e.target)) this.closeMenu()
    })

    // close menu on page change
    this.$on('route.change', e => this.closeMenu())

    // close on ESC keydown
    hotkeys('esc', e => this.closeMenu())
  }


  toggleMenu() {
    const isOpen = this.refs.nav.classList.contains('-open')
    return isOpen ? this.closeMenu() : this.openMenu()
  }


  openMenu() {
    this.refs.burger.classList.add('-open')
    this.refs.nav.classList.add('-open')
    this.$scroll.lock(this.refs.nav)
  }


  closeMenu() {
    this.refs.burger.classList.remove('-open')
    this.refs.nav.classList.remove('-open')
    this.$scroll.unlock()
  }

}