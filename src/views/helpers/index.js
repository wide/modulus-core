module.exports = ({ handlebars }) => {
  handlebars.registerHelper('hash', require('./hash'))
  handlebars.registerHelper('lorem', require('./lorem'))
  handlebars.registerHelper('object', require('./object'))
  handlebars.registerHelper('svg', require('./svg'))
}