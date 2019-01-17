import { Modulus } from 'modulus'
import Page from './modules/page'

console.log(process)

Modulus.boot({
  config: {
    debug: true
  },
  plugins: {},
  modules: {
    Page
  }
})