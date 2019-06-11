module.exports = (name, label = '') => {
  return `<svg role="img" aria-label="${label}"><use xlink:href="assets/icons/sprite-icons.svg#${name}"></use></svg>`
}