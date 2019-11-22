module.exports = (name, label = '') => {
  if (typeof label === 'string' && label !== '') {
    return `<svg role="img" aria-label="${label}"><use xlink:href="/assets/icons/sprite-icons.svg#${name}"></use></svg>`
  } else {
    return `<svg role="img"><use xlink:href="/assets/icons/sprite-icons.svg#${name}"></use></svg>`
  }
}