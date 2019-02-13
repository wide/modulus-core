import Modulus from 'modulus'
import Page from '~/components/page'
import Clickable from '~/components/clickable'
import Intersection from '~/components/intersection'

export default new Modulus({
  config: {
    debug: true
  },
  plugins: {},
  components: {
    Page,
    Clickable,
    Intersection
  }
})