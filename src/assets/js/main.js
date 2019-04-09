import Modulus from 'modulus'

import Router from 'modulus/plugins/router'
import Scroll from 'modulus/plugins/scroll'
import Viewport from 'modulus/plugins/viewport'
import Breakpoint from 'modulus/plugins/breakpoint'

import Page from '~/controllers/page'
import components from '[ROOT]/build/import-components'

import animations from '~/utils/animations'
import transitions from '~/utils/transitions'
import { BREAKPOINTS } from '~/consts'

export default new Modulus({
  config: {
    debug: !process.env.PRODUCTION
  },
  plugins: {
    router: new Router({ transitions, fallback: 'fade' }),
    scroll: new Scroll(),
    viewport: new Viewport({ animations }),
    breakpoint: new Breakpoint({ sizes: BREAKPOINTS })
  },
  controllers: {
    Page
  },
  components: {
    ...components
  }
})