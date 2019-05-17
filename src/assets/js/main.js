import Modulus from 'modulus'

import Router from 'modulus/plugins/router'
import Scroll from 'modulus/plugins/scroll'
import Viewport from 'modulus/plugins/viewport'
import Breakpoint from 'modulus/plugins/breakpoint'
import Cookie from 'modulus/plugins/storage/cookie'
import WebStorage from 'modulus/plugins/storage/web-storage'
import Form from 'modulus/plugins/form'

import Page from '~/controllers/page'
import components from '[ROOT]/build/import-components'

import animations from '~/utils/animations'
import transitions from '~/utils/transitions'
import { BREAKPOINTS } from '~/consts'

export default new Modulus({
  config: {
    debug: !process.env.PRODUCTION,
    expose: true
  },
  plugins: {
    router: new Router({ transitions, fallback: 'fade' }),
    scroll: new Scroll(),
    viewport: new Viewport({ animations }),
    breakpoint: new Breakpoint({ sizes: BREAKPOINTS }),
    cookie: new Cookie(),
    local: new WebStorage('local'),
    session: new WebStorage('session'),
    form: new Form()
  },
  controllers: {
    Page
  },
  components
})