import { animate } from '~/utils/dom'


/**
 * Page transition
 */
export default {

  noop: {
    loading: el => Promise.resolve(),
    loaded: el => Promise.resolve(),
  },

  fade: {
    enter: el => animate(el, { opacity: 0 }),
    leave: el => animate(el, { opacity: 1 })
  }

}