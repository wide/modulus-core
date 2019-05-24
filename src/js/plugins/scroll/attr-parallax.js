import CustomEvent from '../../utils/custom-event'

export default {

  watch($scroll, els) {
    for(let i = 0; i < els.length; i++) {
      $scroll.parallax(els[i], {
        coef: parseFloat(els[i].dataset.parallax) || undefined,
        axis: els[i].dataset['parallax.axis'] || undefined
      })
    }
    window.dispatchEvent(new CustomEvent('scroll'))
  },

  clear($scroll, els) {
    for(let i = 0; i < els.length; i++) {
      $scroll.clearParallax(els[i])
    }
  }

}