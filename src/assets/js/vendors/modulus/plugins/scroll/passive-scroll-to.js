export default {

  apply(scroll, root = document.body) {
    const els = root.querySelectorAll(`[${scroll.config.scrollToAttr}]`)
    for(let i = 0; i < els.length; i++) {
      els[i].addEventListener('click', e => {
        e.stopPropagation()
        const target = e.target.getAttribute(scroll.config.scrollToAttr) || e.target.href
        scroll.to(target)
        return false
      })
    }
  },


  clear() {}

}