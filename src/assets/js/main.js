import Modulus from 'modulus'
import Viewport from 'modulus/plugins/viewport'
import Breakpoint from 'modulus/plugins/breakpoint'

import Page from '~/components/page'
import Clickable from '~/components/clickable'
import Intersection from '~/components/intersection'

import animations from '~/utils/animations'
import { BREAKPOINTS } from '~/vars'
import '~/polyfill'

export default new Modulus({
  config: {
    debug: true
  },
  plugins: {
    viewport: new Viewport({ animations }),
    breakpoint: new Breakpoint({ sizes: BREAKPOINTS })
  },
  components: {
    Page,
    Clickable,
    Intersection
  }
})