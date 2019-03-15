import path from 'path'
import fs from 'fs'

/**
 * List recusively JS files in a folder
 * @param {String} base 
 * @param {String} dir 
 * @param {Array} files 
 */
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

/**
 * Generate a file import with seeken JS files
 * @param {String} root 
 */
function generateImports(root) {

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


export default (root) => {
  try {
    generateImports(root)
  }
  catch(err) {
    console.error('Cannot generate imports:', err)
  }
}