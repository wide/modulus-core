import fs from 'fs'
import path from 'path'
import cfg from '../config'
import { toCamel } from '../src/assets/js/utils/string'


/**
 * Templates
 */

const masterTemplate = (name) =>
`import Component from 'modulus/component'

export default class ${toCamel(name, true)} extends Component {

  
  /**
   * Initialize master component
   */
  onInit() {

    this.log('hello, this is ${name} !')

  }


  /**
   *  Destroy master component
   */
  onDestroy() {

  }

}`


export default (root, name, done) => {
  try {
    console.log(`Creating "${name}" master:`)
    const folder = path.resolve(root + '/' + cfg.src.js.root + '/masters')
    fs.writeFileSync(`${folder}/${name}.js`, masterTemplate(name))
    console.log(`-> "${folder}/${name}.js" created`)
    console.log(`Note: you need to register this master in your "main.js"`)
    done()
  }
  catch(err) {
    console.error('Cannot create master:', err)
    throw err
  }
}