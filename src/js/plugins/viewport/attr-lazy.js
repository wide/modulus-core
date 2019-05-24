export default {

  /**
   * Lazy load img with `data-src` attribute when entering the viewport
   */
  watch($viewport, els) {
    $viewport.observe({
      target: els,
      once: true, // destroy observer after callback
      offset: '200px', // trigger 200px before entering viewport
      callback: el => el.src = el.dataset.src
    })
  },

  clear() {}

}