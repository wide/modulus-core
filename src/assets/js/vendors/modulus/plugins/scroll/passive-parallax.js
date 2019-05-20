import CustomEvent from '~/utils/custom-event'

export default {

  apply(scroll, root = document.body) {

    const els = root.querySelectorAll(`[${scroll.config.parallaxAttr}]`)
    for(let i = 0; i < els.length; i++) {
      scroll.parallax(els[i], {
        coef: parseFloat(els[i].getAttribute(scroll.config.parallaxAttr)) || undefined,
        axis: els[i].getAttribute(`${scroll.config.parallaxAttr}.axis`) || undefined
      })
    }
  
    // trigger scroll event once for detection
    window.dispatchEvent(new CustomEvent('scroll'))
  },

  clear(scroll, root = document.body) {
    const els = root.querySelectorAll(`[${scroll.config.parallaxAttr}]`)
    for(let i = 0; i < els.length; i++) {
      scroll.clearParallax(els[i])
    }
  }

}