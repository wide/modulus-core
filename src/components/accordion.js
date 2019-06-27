import Component              from '../component'
import { slideUp, slideDown } from '../utils/dom'


export default class extends Component {


  /**
   * Initialize accordion component
   */
  onInit() {
    this.questions = this.el.querySelectorAll('[aria-controls]')
    for(let i = 0; i < this.questions.length; i++) {
      this.listenQuestion(this.questions[i])
    }
  }


  /** 
   * Listen click event and toggle to related answer
   * @param {HTMLElement} question 
   */
  listenQuestion(question) {
    question.addEventListener('click', e => this.toggle(question))
  }


  /**
   * Toggle both question and answer
   * @param {HTMLElement} question 
   * @return {Promise}
   */
  toggle(question) {
    const answer = this.getAnswer(question)
    return this.isClose(answer)
      ? this.open(question, answer)
      : this.close(question, answer)
  }


  /**
   * Get question's answer based on `aria-controls` attribute
   * @param {HTMLELement} question 
   * @return {HTMLElement}
   */
  getAnswer(question) {
    const id = question.getAttribute('aria-controls')
    return document.getElementById(id)
  }


  /**
   * Check close state of a specific question
   * @param {HTMLElement} question 
   * @param {HTMLElement} answer 
   * @return {Bool}
   */
  isClose(answer) {
    return answer.hidden
  }


  /**
   * Open specific question and answer
   * @param {HTMLElement} question 
   * @param {HTMLElement} answer 
   * @return {Promise}
   */
  open(question, answer) {
    this.emit('open', question, answer)
    question.setAttribute('aria-expanded', true)
    answer.hidden = false
    return slideDown(answer)
  }


  /**
   * Close specific question and answer
   * @param {HTMLElement} question 
   * @param {HTMLElement} answer 
   * @return {Promise}
   */
  close(question, answer) {
    this.emit('close', question, answer)
    question.setAttribute('aria-expanded', false)
    return slideUp(answer).then(e => answer.hidden = true)
  }


  /**
   * Create accordion not as a component
   * @param {HTMLElement} el 
   */
  static create(el) {
    const instance = new this(el, {})
    instance.onInit()
    return instance
  }

}