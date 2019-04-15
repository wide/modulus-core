import fs from 'fs'
import path from 'path'
import cfg from '../config'
import { toCamel } from '../src/assets/js/utils/string'


/**
 * Templates
 */

const controllerTemplate = (name) =>
`import Component from 'modulus/component'

export default class ${toCamel(name, true)} extends Component {

  
  /**
   * Initialize controller
   */
  onInit() {

  }

}`


export default (root, name, done) => {
  try {
    console.log(`Creating "${name}" controller:`)
    const folder = path.resolve(root + '/' + cfg.src.js.root + '/controllers')
    fs.writeFileSync(`${folder}/${name}.js`, controllerTemplate(name))
    console.log(`-> "${folder}/${name}.js" created`)
    console.log(`Note: you need to register this controller in your "main.js"`)
    done()
  }
  catch(err) {
    console.error('Cannot create controller:', err)
    throw err
  }
}