import Modulus from 'modulus'
import Viewport from 'modulus/plugins/viewport'
import Breakpoint from 'modulus/plugins/breakpoint'

import Page from '~/components/page'

import animations from '~/utils/animations'
import { BREAKPOINTS } from '~/vars'

export default new Modulus({
  config: {
    debug: !process.env.PRODUCTION
  },
  plugins: {
    viewport: new Viewport({ animations }),
    breakpoint: new Breakpoint({ sizes: BREAKPOINTS })
  },
  components: {
    Page
  }
})