export default class {


  /**
   * Add -enter / -leave css class to transitionable element
   * @param {String} name - css classname to apply
   * @return {Function}
   */
  static enterLeaveTransition(name) {
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
  

}