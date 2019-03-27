import fs from 'fs'
import path from 'path'
import cfg from '../config'


/**
 * Templates
 */

const htmlTemplate = (name) =>
`<div class="${name}" data-mod="${name}">

</div>`

const scssTemplate = (name) =>
`.${name} {

}`

const jsTemplate = (name) =>
`import Component from 'modulus/component'

export default class extends Component {


  /**
   * Initialize component 
   */
  onInit() {

    this.log('hello, this is ${name} !')

  }


  /**
   * Destroy component
   */
  onDestroy() {

  }

}`


/**
 * Create component folder
 * @param {String} folder 
 * @param {String} name 
 */
const createFolder = (folder, name) => {

  if(fs.existsSync(folder)) {
    throw `Component "${folder}" already exists.`
  }

  fs.mkdirSync(folder)
  console.log(`-> "${folder}" created`)
}


/**
 * Create file
 * @param {String} folder 
 * @param {String} name 
 * @param {String} type 
 * @param {String} content 
 */
const createFile = (folder, name, type, content) => {
  fs.writeFileSync(`${folder}/${name}.${type}`, content)
  console.log(`-> "${folder}/${name}.${type}" created`)
}


export default (root, name, done) => {
  try {
    console.log(`Creating "${name}" component:`)
    const folder = path.resolve(root + '/' + cfg.src.html.partials + name)
    createFolder(folder, name)
    createFile(folder, name, 'html', htmlTemplate(name))
    createFile(folder, name, 'scss', scssTemplate(name))
    createFile(folder, name, 'js', jsTemplate(name))
    done()
  }
  catch(err) {
    console.error('Cannot create component:', err)
    throw err
  }
}