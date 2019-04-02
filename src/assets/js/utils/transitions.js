import { ANIM_DURATION } from '~/consts'


/**
 * Page transition
 */
export default {

  noop: {
    loading: el => new Promise(done => setTimeout(done, 5000)),
    loaded: el => new Promise(done => setTimeout(done, 5000)),
  },

  fade: {
    loading: el => new Promise(done => {
      el.animate([
        { opacity: 1 },
        { opacity: 0 },
      ], {
        duration: ANIM_DURATION
      }).onfinish = done
    }),
    loaded: el => new Promise(done => {
      el.animate([
        { opacity: 0 },
        { opacity: 1 },
      ], {
        duration: ANIM_DURATION
      }).onfinish = done
    })
  }

}