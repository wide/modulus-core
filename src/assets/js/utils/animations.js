import { animateFrom } from '~/utils/dom'

export default {

  noop: {
    enter: () => Promise.resolve(), 
    leave: () => Promise.resolve()
  },

  fade: {
    enter: els => animateFrom(els, { opacity: 0 }, { opacity: 1 }),
    leave: els => animateFrom(els, { opacity: 1 }, { opacity: 0 }),
  },

  fadeUp: {
    enter: els => animateFrom(els, { opacity: 0, y: 60 }, { opacity: 1, y: 0 }),
    leave: els => animateFrom(els, { opacity: 1, y: 0 }, { opacity: 0, y: 60 }),
  },

  fadeDown: {
    enter: els => animateFrom(els, { opacity: 0, y: -60 }, { opacity: 1, y: 0 }),
    leave: els => animateFrom(els, { opacity: 1, y: 0 }, { opacity: 0, y: -60 }),
  },

  fadeLeft: {
    enter: els => animateFrom(els, { opacity: 0, x: 60 }, { opacity: 1, x: 0 }),
    leave: els => animateFrom(els, { opacity: 1, x: 0 }, { opacity: 0, x: 60 }),
  },

  fadeRight: {
    enter: els => animateFrom(els, { opacity: 0, x: -60 }, { opacity: 1, x: 0 }),
    leave: els => animateFrom(els, { opacity: 1, x: 0 }, { opacity: 0, x: -60 }),
  }

}