import { Modulus } from 'modulus'
import Page from '~/components/page'
import Clickable from '~/components/clickable'

export default new Modulus({
  config: {
    debug: true
  },
  plugins: {},
  components: {
    Page,
    Clickable
  }
})