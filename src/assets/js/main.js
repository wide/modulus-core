import Modulus from 'modulus'

// plugins
import Viewport from 'modulus/plugins/viewport'
import Breakpoint from 'modulus/plugins/breakpoint'

// master components
import Page from '~/masters/page'

// components
import importComponents from '[ROOT]/build/import-components'

// config for plugins
import animations from '~/utils/animations'
import { BREAKPOINTS } from '~/consts'

// modulus instance
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