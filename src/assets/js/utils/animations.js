import { timeline } from '~/utils/dom'

export default {

  fadeUp: {
    enter: els => timeline(els,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0 }
    )
  }

}