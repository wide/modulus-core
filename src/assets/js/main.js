import Modulus from 'modulus'
import Viewport from 'modulus/plugins/viewport'
import Breakpoint from 'modulus/plugins/breakpoint'

import Page from '~/components/page'
import Clickable from '~/components/clickable'
import Intersection from '~/components/intersection'

import { BREAKPOINTS } from '~/vars'

export default new Modulus({
  config: {
    debug: true
  },
  plugins: {
    viewport: new Viewport(),
    breakpoint: new Breakpoint(BREAKPOINTS)
  },
  components: {
    Page,
    Clickable,
    Intersection
  }
})