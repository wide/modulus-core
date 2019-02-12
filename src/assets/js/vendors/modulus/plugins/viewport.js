export default class Viewport {

  static observe({ scope, target, once, callback }) {

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          callback(entry.target, entry)
          if(once) observer.unobserve(entry.target)
        }
      })
    }, { root: scope })

    const els = (target.forEach) ? target : [target]
    els.forEach(node => observer.observe(node))

    return observer
  }

  static affix({ scope, target, offset, topClass, bottomClass, callback }) {

  }

  static scroll({ scope, target, callback }) {

  }

}

/*

this.$viewport.intersection({
  scope: document.body,
  offset: 40,
  once: true,
  callback(offsetTop, direction) {
    offsetTop // 250px from scope offset top
    direction // UP, DOWN, undefined
  }
})

this.$viewport.affix({
  scope: document.body,
  offset: 40,
  topClass: 'affixed-top',
  bottomClass: 'affixed-bottom',
  callback(offsetTop, direction, position) {
    offsetTop // 250px from scope offset top
    direction // UP, DOWN or undefined
    position // TOP, BOTTOM or undefined
  }
})

this.$viewport.scroll({
  scope: document.body,
  callback(offsetTop, direction) {
    offsetTop // 250px from scope offset top
    direction // UP, DOWN, undefined
  }
})

*/