'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (name) {

  if (typeof Event === 'function') {
    return new Event(name);
  }

  // ie11
  var event = document.createEvent('Event');
  event.initEvent(name, true, true);
  return event;
};
//# sourceMappingURL=custom-event.js.map