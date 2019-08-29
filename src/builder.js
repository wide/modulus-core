import fs from 'fs'

/**
 * Transform hypen-case to camelCase
 * @param {String} string
 */
function toCamel(string) {
  let camelized = string.replace(/-([a-z])/g, g => g[1].toUpperCase())
  return camelized.charAt(0).toUpperCase() + camelized.slice(1)
}


/**
 * Create component folder
 * @param {String} folder
 */
function createFolder(folder) {
  if(!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
    console.log(`-> "${folder}" created`)
  }
  else throw `Folder "${folder}" already exists.`
}


/**
 * Create file
 * @param {String} folder
 * @param {String} name
 * @param {String} type
 * @param {String} content
 */
function createFile(folder, name, type, content) {
  fs.writeFileSync(`${folder}/${name}.${type}`, content)
  console.log(`-> "${folder}/${name}.${type}" created`)
}


/**
 * Generate component HTML template
 * @param {String} name
 */
const componentHTMLTemplate = (name) =>
`<div class="${name}" data-mod="${name}">

</div>`


/**
 * Generate component HTML template
 * @param {String} name
 */
const webComponentHTMLTemplate = (name) =>
`<${name} class="${name}">

</${name}>`


/**
 * Generate component SCSS template
 * @param {String} name
 */
const componentSCSSTemplate = (name) =>
`.${name} {

}`


/**
 * Generate component JS template
 * @param {String} name
 */
const componentJSTemplate = (name) =>
`import Component from 'modulus/component'

export default class extends Component {

  onInit() {

  }

}`


/**
 * Generate component MD doc
 * @param {String} name
 */
const componentMDTemplate = (name) =>
`# ${name}

{{{{demo}}}}
{{> ${name}}}
{{{{/demo}}}}`


/**
 * Generate plugin JS template
 * @param {String} name
 */
const pluginJSTemplate = (name) =>
`import Plugin from 'modulus/plugin'

export default class ${toCamel(name)} extends Plugin {

  onInit() {

  }

}`


/**
 * Create an empty component
 * @param {String} root
 * @param {String} name
 * @param {Function} done
 */
export function createComponent(root, name, done) {
  try {
    console.log(`Creating "${name}" component:`)
    createFolder(root, name)
    createFile(root, name, 'html', componentHTMLTemplate(name))
    createFile(root, name, 'scss', componentSCSSTemplate(name))
    createFile(root, name, 'js', componentJSTemplate(name))
    createFile(root, name, 'md', componentMDTemplate(name))
    done()
  }
  catch(err) {
    console.error('Cannot create component:', err)
    throw err
  }
}


/**
 * Create an empty web-component
 * @param {String} root
 * @param {String} name
 * @param {Function} done
 */
export function createWebComponent(root, name, done) {
  try {
    console.log(`Creating "${name}" web-component:`)
    createFolder(root, name)
    createFile(root, name, 'html', webComponentHTMLTemplate(name))
    createFile(root, name, 'scss', componentSCSSTemplate(name))
    createFile(root, name, 'js', componentJSTemplate(name))
    createFile(root, name, 'md', componentMDTemplate(name))
    done()
  }
  catch(err) {
    console.error('Cannot create web-component:', err)
    throw err
  }
}


/**
 * Create an empty plugin
 * @param {String} root
 * @param {String} name
 * @param {Function} done
 */
export function createPlugin(root, name, done) {
  try {
    console.log(`Creating "${name}" plugin:`)
    createFile(root, name, 'js', pluginJSTemplate(name))
    console.log(`Note: you need to register this plugin in your "main.js"`)
    done()
  }
  catch(err) {
    console.error('Cannot create plugin:', err)
    throw err
  }
}