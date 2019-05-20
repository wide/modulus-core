export default {

  apply(scroll, root = document.body) {
    const els = root.querySelectorAll(`[${scroll.config.stickyAttr}]`)
    for(let i = 0; i < els.length; i++) {
      scroll.sticky(els[i])
    }
  },

  clear(scroll, root = document.body) {
    const els = root.querySelectorAll(`[${scroll.config.stickyAttr}]`)
    for(let i = 0; i < els.length; i++) {
      scroll.clearSticky(els[i])
    }
  }

}