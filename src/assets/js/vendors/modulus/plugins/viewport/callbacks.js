export default class {


  /**
   * Add -enter / -leave css class to transitionable element
   * @param {String} name - css classname to apply
   * @return {Function}
   */
  static cssAnimation(name) {
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
   * Trigger enter() / leave() js animations to 
   * @param {String} name - css classname to apply transitionable element
   * @return {Function}
   */
  static jsAnimation(name, animations) {
    return function(el, entry) {
      if(entry.isIntersecting && animations[name].enter) {
        animations[name].enter(el, entry)
      }
      if(!entry.isIntersecting && animations[name].leave) {
        animations[name].leave(el, entry)
      }
    }
  }
  
}