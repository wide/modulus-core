'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Private method: apply observer to attributes
 * @param {Plugin} self 
 * @param {HTMLElement} root 
 */
function watchAttributes($plugin) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

  for (var attr in $plugin.attributes) {
    var els = root.querySelectorAll('[' + attr + ']');
    $plugin.attributes[attr].watch($plugin, els, root);
  }
}

/**
 * Private method: clear observer to attributes
 * @param {Plugin} self 
 * @param {HTMLElement} root 
 */
function clearAttributes($plugin) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

  for (var attr in $plugin.attributes) {
    var els = root.querySelectorAll('[' + attr + ']');
    $plugin.attributes[attr].clear($plugin, els, root);
  }
}

/**
 * Plugin Class
 */

var Plugin = function () {
  function Plugin() {
    _classCallCheck(this, Plugin);

    this.attributes = {};
  }

  /**
   * Setup component before onInit
   */


  _createClass(Plugin, [{
    key: 'onSetup',
    value: function onSetup() {
      var _this = this;

      watchAttributes(this);
      this.$on('dom.destroyed', function (root) {
        return clearAttributes(_this, root);
      });
      this.$on('dom.updated', function (root) {
        return watchAttributes(_this, root);
      });
    }

    /**
     * Initialize component 
     */

  }, {
    key: 'onInit',
    value: function onInit() {}

    /**
     * Listen to global event bus
     * @param {String} event 
     * @param {Function} callback 
     */

  }, {
    key: '$on',
    value: function $on(event, callback) {
      this.$modulus.on(event, function () {
        return callback.apply(undefined, arguments);
      });
    }

    /**
     * Emit to both global and local event bus
     * @param {String} event 
     * @param  {...any} args 
     */

  }, {
    key: '$emit',
    value: function $emit(event) {
      var _$modulus;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_$modulus = this.$modulus).emit.apply(_$modulus, [event].concat(args));
    }
  }]);

  return Plugin;
}();

exports.default = Plugin;
//# sourceMappingURL=plugin.js.map