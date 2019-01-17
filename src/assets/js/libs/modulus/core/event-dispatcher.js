export default class EventDispatcher {

  constructor() {
    this.events = {}
  }

  on(source, event, callback) {
    this.events[event] = this.events[event] || []
    this.events[event].push({ source, callback })
  }

  emit(source, event, ...args) {
    if(this.events[event]) {
      this.events[event].forEach(item => {
        if(!item.source || item.source == source) {
          item.callback(...args)
        }
      })
    }
  }

}