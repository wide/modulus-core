export class ScrollManager {

  constructor() {
    this.className = '-affixed'
    this.registered = []
    window.addEventListener('scroll', e => this.handle(e))
  }

  register(opts) {
    this.registered.push(opts)
    this.handle()
  }

  handle(e) {
    for(let i = 0; i < this.registered.length; i++) {

      // calculate affix point position
      const o = this.registered[i]
      let affixPoint = o.el.offsetTop - o.container.offsetTop
      if(o.el.position == 'bottom') affixPoint += o.el.offsetHeight

      // enters affix point
      if(window.scrollY >= affixPoint && !o.affixed) {
        o.module.$log('enter affix position')
        if(!o.placeholder) {
          o.placeholder = document.createElement('div')
          o.placeholder.classList.add('affix-placeholder')
          o.placeholder.style.height = o.el.offsetHeight + 'px'
          o.el.parentNode.insertBefore(o.placeholder, o.el.nextSibling)
        }
        o.el.classList.add(this.className)
        o.affixed = true
      }

      // leave affix point
      if(window.scrollY < affixPoint && o.affixed) {
        o.module.$log('leave affix position')
        o.el.classList.remove(this.className)
        o.affixed = false
      }

    }
  }

}


// installer
export default (Module) => {

  const scrollManager = new ScrollManager()

  Module.prototype.$affix = function() {
    scrollManager.register(Object.assign({
      el: this.el,
      container: document.body,
      position: 'top'
    }, opts, {
      module: this
    }))
  }

}