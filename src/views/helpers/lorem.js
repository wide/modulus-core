const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elementum, nisl at finibus laoreet,
  lacus ante egestas magna, nec venenatis ante diam eget ipsum. Proin sit amet est sed felis porta porttitor.
  Aliquam feugiat dapibus sollicitudin. Praesent tristique odio at bibendum gravida. Morbi vulputate ultricies
  ligula non mattis. In sapien tortor, egestas non tempus eu, hendrerit ac magna. Mauris porttitor mollis leo
  venenatis eleifend. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
  Donec varius placerat ex ut egestas. Sed laoreet justo pharetra euismod consequat. Praesent accumsan lacus
  id sem hendrerit semper. Nunc mattis ultricies arcu sed maximus. Etiam eget vulputate enim. Vestibulum suscipit
  nisi nec massa hendrerit condimentum.`

const words = lorem.split(' ')

module.exports = function({ hash }) {
  let output = '', n = hash.w || hash.p || 1, i = n
  while(i--) output += (hash.w) ? words[n-i] : `<p>${lorem}</p>`
  return output
}