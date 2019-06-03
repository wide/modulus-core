export default {

  watch($scroll, els) {
    for(let i = 0; i < els.length; i++) {
      els[i].addEventListener('click', e => {
        e.stopPropagation()
        $scroll.to(e.target.dataset.scrollTo || e.target.href)
        return false
      })
    }
  },


  clear() {}

}