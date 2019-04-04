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
    loading: el => animate(el, { opacity: 1 }, { opacity: 0 }),
    loaded: el => animate(el, { opacity: 0 }, { opacity: 1 })
  }

}