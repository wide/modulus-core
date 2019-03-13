const path = require('path')
const fs = require('fs')

function walk(base, dir = '', files = []) {
  fs.readdirSync(base + dir).forEach(file => {
    if(fs.statSync(base + dir + file).isDirectory()) {
      files = walk(base, dir + file + '/', files)
    }
    else if(path.extname(file) === '.js') {
      files.push({
        filename: path.basename(file, '.js'),
        path: dir + file
      })
    }
  })
  return files
}

module.exports = (root) => {

  let i = 0, j = 0
  const files = walk(root)

  const content = 
    `/* AUTO GENERATED */
    ${files.map(file => `import m${i++} from '@/${file.path}'`).join("\n")}
    export default {
      ${files.map(file => `'${file.filename}': m${j++}`).join(",\n")}
    }
    /* AUTO GENERATED */`

  return fs.writeFileSync('./build/import-components.js', content)
}