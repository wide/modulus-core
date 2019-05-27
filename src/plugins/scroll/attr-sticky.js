export default {

  watch($scroll, els) {
    for(let i = 0; i < els.length; i++) {
      $scroll.sticky(els[i])
    }
  },

  clear($scroll, els) {
    for(let i = 0; i < els.length; i++) {
      $scroll.clearSticky(els[i])
    }
  }

}