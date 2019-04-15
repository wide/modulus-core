import { animate } from '~/utils/dom'
import { ANIM_DURATION } from '~/consts'


/**
 * Elements animation
 */
export default {

  /**
   * Fade: enter -> in / leave -> out
   */
  fade: {
    enter: el => animate(el, { opacity: 0 }, { opacity: 1 }, ANIM_DURATION),
    leave: el => animate(el, { opacity: 1 }, { opacity: 0 }, ANIM_DURATION)
  }

}