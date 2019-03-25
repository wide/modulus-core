/**
 * Automatically observe `data-anim` attribute
 * @param {Viewport} viewport
 * 
 * <div data-anim="fade"            will add `.fade-enter` and `.fade-leave` on transition
 *      data-anim.enter="true"
 *      data-anim.leave="true"
 *      data-anim.once="true"
 *      data-anim.offset="-100px"
 * >...</div>
 * 
 * For JS transition, prefix the name with `@`: `<div data-anim="@fade">`, will call `fade.enter()` and `fade.leave()`
 */
export default function(viewport) {

  // get transitionable elements
  const els = document.querySelectorAll(`[${viewport.config.animAttribute}]`)
  for(let i = 0; i < els.length; i++) {

    // get transition name
    let name = els[i].getAttribute(viewport.config.animAttribute)
    const isJS = name[0] === '@'
    name = isJS ? name.substr(1) : name

    // get transition data
    let enter = els[i].getAttribute(`${viewport.config.animAttribute}.enter`)
    let leave = els[i].getAttribute(`${viewport.config.animAttribute}.leave`)
    let once = els[i].getAttribute(`${viewport.config.animAttribute}.once`)
    let offset = els[i].getAttribute(`${viewport.config.animAttribute}.offset`)

    // default values
    if(enter === null && leave === null) {
      enter = true
      leave = false
      once = true
    }
    // parse values
    else {
      enter = (enter === 'true')
      leave = (leave === 'true')
      once = (once === 'true')
    }

    if(!offset) offset = '-120px'

    // create observer
    viewport.observe({
      target: els[i],
      enter, leave, once, offset,
      callback(el, entry) {

        // JS transition
        if(isJS) {
          const verb = (entry.isIntersecting) ? 'enter' : 'leave'
          if(viewport.animations[name][verb]) {
            viewport.animations[name][verb](el)
          }
        }
        // CSS transition
        else {
          if(entry.isIntersecting) {
            el.classList.remove(`${name}-leave`)
            el.classList.add(`${name}-enter`)
          }
          else {
            el.classList.remove(`${name}-enter`)
            el.classList.add(`${name}-leave`)
          }
        }

      }
    })
  }

}