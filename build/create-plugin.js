import fs from 'fs'
import path from 'path'
import cfg from '../config'
import { toCamel } from '../src/assets/js/utils/string'


/**
 * Templates
 */

const pluginTemplate = (name) =>
`import Plugin from 'modulus/plugin'

export default class ${toCamel(name, true)} extends Plugin {

  
  /**
   * New ${name} plugin
   */
  constructor() {
    super()
  }


  /**
   * Initialize plugin
   */
  onInit() {

  }

}`


export default (root, name, done) => {
  try {
    console.log(`Creating "${name}" plugin:`)
    const folder = path.resolve(root + '/' + cfg.src.js.root + '/plugins')
    fs.writeFileSync(`${folder}/${name}.js`, pluginTemplate(name))
    console.log(`-> "${folder}/${name}.js" created`)
    console.log(`Note: you need to register this plugin in your "main.js"`)
    done()
  }
  catch(err) {
    console.error('Cannot create plugin:', err)
    throw err
  }
}