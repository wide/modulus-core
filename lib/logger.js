"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var active = _ref.active,
      prefix = _ref.prefix;


  var logger = function logger() {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (active) (_console = console).log.apply(_console, [prefix].concat(args));
  };

  logger.info = function () {
    var _console2;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (active) (_console2 = console).info.apply(_console2, [prefix].concat(args));
  };

  logger.debug = function () {
    var _console3;

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    if (active) (_console3 = console).debug.apply(_console3, [prefix].concat(args));
  };

  logger.warn = function () {
    var _console4;

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    if (active) (_console4 = console).warn.apply(_console4, [prefix].concat(args));
  };

  logger.error = function () {
    var _console5;

    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    (_console5 = console).error.apply(_console5, [prefix].concat(args)); // always show errors
  };

  return logger;
};
//# sourceMappingURL=logger.js.map