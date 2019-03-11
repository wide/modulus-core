/**
 * Trigger enter() / leave() js animations to 
 * @param {String} name - css classname to apply transitionable element
 * @return {Function}
 */
function applyJSAnimation(name, animations) {
  return function(el, entry) {
    if(entry.isIntersecting && animations[name].enter) {
      animations[name].enter(el, entry)
    }
    if(!entry.isIntersecting && animations[name].leave) {
      animations[name].leave(el, entry)
    }
  }
}


/**
 * Add -enter / -leave css class to transitionable element
 * @param {String} name - css classname to apply
 * @return {Function}
 */
function applyCSSAnimation(name) {
  return function(el, entry) {
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


/**
 * Automatically observe `data-viewport-anim` attribute
 * @param {Viewport} viewport
 * 
 * CSS Animations :
 * - `[data-viewport-anim="fade"]` will add `.fade-enter` and `.fade-leave` when entering/leaving viewport
 * - `[data-viewport-anim="fade:enter"]` will add `.fade-enter` when entering viewport only
 * - `[data-viewport-anim="fade:enter,once"]` will add `.fade-enter` when entering viewport one time only
 * 
 * JS Animations :
 * - `[data-viewport-anim="@fade"]` will call `fade.enter()` and `fade.leave()` when entering/leaving viewport
 * - `[data-viewport-anim="@fade:enter"]` will call `fade.enter()` when entering viewport only
 * - `[data-viewport-anim="@fade:enter,once"]` will call `fade.enter()` when entering viewport one time only
 */
export default function(viewport) {

  // get transitionable elements
  const els = document.querySelectorAll(`[data-viewport-anim]`)
  for(let i = 0; i < els.length; i++) {

    // parse name and modifiers
    const [_name, _modifiers] = els[i].dataset.viewportAnim.split(':')
    const jsAnimation = (_name[0] === '@')
    const name = jsAnimation ? _name.substr(1) : _name
    const modifiers = _modifiers ? _modifiers.split(',') : ['enter']

    // create observer
    viewport.observe({
      target: els[i],
      enter: modifiers.includes('enter'),
      leave: modifiers.includes('leave'),
      once: modifiers.includes('once'),
      callback: jsAnimation
        ? applyJSAnimation(name, viewport.animations)
        : applyCSSAnimation(name)
    })
  }

}