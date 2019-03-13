import Modulus from 'modulus'
import Viewport from 'modulus/plugins/viewport'
import Breakpoint from 'modulus/plugins/breakpoint'

import Page from '~/masters/page'
import importComponents from '[ROOT]/build/import-components'

import animations from '~/utils/animations'
import { BREAKPOINTS } from '~/consts'


export default new Modulus({
  config: {
    debug: !process.env.PRODUCTION
  },
  plugins: {
    viewport: new Viewport({ animations }),
    breakpoint: new Breakpoint({ sizes: BREAKPOINTS })
  },
  masters: {
    Page
  },
  components: {
    ...importComponents
  }
})