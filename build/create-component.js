import fs from 'fs'
import path from 'path'
import cfg from '../config'

export default (root, name) => {

  const folder = path.resolve(root + '/' + cfg.src.html.partials + name)

  if(fs.existsSync(folder)) {
    console.error(`Component "${name}" already exists.`)
  }

  // create folder
  fs.mkdirSync(folder)
  console.log(`Creating "${name}" component`)

  // create html file
  fs.writeFileSync(`${folder}/${name}.html`, 
`<div class="${name}" data-mod="${name}">

</div>`)
  console.log(`-> "${folder}/${name}.html" created`)

  // create html file
  fs.writeFileSync(`${folder}/${name}.scss`, 
`.${name} {

}`)
  console.log(`-> "${folder}/${name}.scss" created`)

  // create html file
  fs.writeFileSync(`${folder}/${name}.js`, 
`import Component from 'modulus/component'

export default class extends Component {

  onInit() {

    this.log('hello, this is ${name} !')

  }

}`)
  console.log(`-> "${folder}/${name}.js" created`)

}