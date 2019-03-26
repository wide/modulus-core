import Modulus from 'modulus'

import ScrollPlugin from 'modulus/plugins/scroll'
import ViewportPlugin from 'modulus/plugins/viewport'
import BreakpointPlugin from 'modulus/plugins/breakpoint'

import Page from '~/masters/page'
import importComponents from '[ROOT]/build/import-components'

import animations from '~/utils/animations'
import { BREAKPOINTS } from '~/consts'


export default new Modulus({
  config: {
    debug: !process.env.PRODUCTION
  },
  plugins: {
    scroll: new ScrollPlugin(),
    viewport: new ViewportPlugin({ animations }),
    breakpoint: new BreakpointPlugin({ sizes: BREAKPOINTS })
  },
  masters: {
    Page
  },
  components: {
    ...importComponents
  }
})