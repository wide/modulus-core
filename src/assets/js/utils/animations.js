export default {

  /**
   * Fade: enter -> in / leave -> out
   */
  fade: {
    enter: el => setTimeout(() => el.style.opacity = 1, 1000),
    leave: el => setTimeout(() => el.style.opacity = 0, 1000)
  }

}