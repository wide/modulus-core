import Modulus from 'modulus'

import ScrollPlugin from 'modulus/plugins/scroll'
import ViewportPlugin from 'modulus/plugins/viewport'
import BreakpointPlugin from 'modulus/plugins/breakpoint'
import RouterPlugin from 'modulus/plugins/router'

import Page from '~/masters/page'
import importComponents from '[ROOT]/build/import-components'

import animations from '~/utils/animations'
import transitions from '~/utils/transitions'
import { BREAKPOINTS } from '~/consts'
import '~/polyfill'


export default new Modulus({
  config: {
    debug: !process.env.PRODUCTION
  },
  plugins: {
    scroll: new ScrollPlugin(),
    viewport: new ViewportPlugin({ animations }),
    breakpoint: new BreakpointPlugin({ sizes: BREAKPOINTS }),
    router: new RouterPlugin({
      transitions,
      container: 'main',
      fallback: 'fade'
    })
  },
  masters: {
    Page
  },
  components: {
    ...importComponents
  }
})