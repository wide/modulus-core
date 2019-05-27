'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Breakpoint = function (_Plugin) {
  _inherits(Breakpoint, _Plugin);

  /**
   * New Breapoint plugin
   * @param {Object} opts 
   * @param {Object} opts.sizes of breakpoint sizes
   */
  function Breakpoint(_ref) {
    var sizes = _ref.sizes;

    _classCallCheck(this, Breakpoint);

    var _this = _possibleConstructorReturn(this, (Breakpoint.__proto__ || Object.getPrototypeOf(Breakpoint)).call(this));

    _this.sizes = _this.resolveBoundaries(sizes);
    _this.current = _this.compute();
    _this.callbacks = [];
    return _this;
  }

  /**
   * Compute breakpoints with boudaries
   * @param {Object} sizes
   * @return {Object}
   */


  _createClass(Breakpoint, [{
    key: 'resolveBoundaries',
    value: function resolveBoundaries(sizes) {
      var output = {};
      var sorted = Object.keys(sizes).map(function (key) {
        return { key: key, value: sizes[key] };
      }).sort(function (a, b) {
        return a[1] - b[1];
      });
      for (var i = 0; i < sorted.length; i++) {
        var current = sorted[i];
        var nextValue = sorted[i + 1] ? sorted[i + 1].value - 1 : Infinity;
        output[current.key] = { min: current.value, max: nextValue };
      }
      return output;
    }

    /**
     * Build plugin necessities
     */

  }, {
    key: 'onInit',
    value: function onInit() {
      var _this2 = this;

      window.addEventListener('resize', function (e) {
        return _this2.onResize();
      });
      this.listen(function (breakpoint) {
        return _this2.$emit('breakpoint', breakpoint);
      });
    }

    /**
     * Listen viewport resize and compute breakpoint
     * @param {Function} callback 
     */

  }, {
    key: 'onResize',
    value: function onResize() {
      var computed = this.compute();
      if (computed.name !== this.current.name) {
        this.current = computed;
        for (var i = 0; i < this.callbacks.length; i++) {
          this.callbacks[i](computed);
        }
      }
    }

    /**
     * Add listener on resize event
     */

  }, {
    key: 'listen',
    value: function listen(callback) {
      this.callbacks.push(callback);
    }

    /**
     * Remove listener
     * @param {Function} callback 
     */

  }, {
    key: 'clear',
    value: function clear(callback) {
      var i = this.callbacks.indexOf(callback);
      this.callbacks.splice(i, 1);
    }

    /**
     * Compute breakpoint from window width
     */

  }, {
    key: 'compute',
    value: function compute() {
      var name = null;
      for (var key in this.sizes) {
        if (this.up(key)) name = key;
      }
      return { name: name, value: window.innerWidth };
    }

    /**
     * Check if size is above specific breakpoint
     * @param {String} name 
     * @return {Boolean}
     */

  }, {
    key: 'up',
    value: function up(name) {
      return window.innerWidth >= this.sizes[name].min;
    }

    /**
     * Check if size is under specific breakpoint
     * @param {String} name 
     * @return {Boolean}
     */

  }, {
    key: 'down',
    value: function down(name) {
      return window.innerWidth <= this.sizes[name].max;
    }

    /**
     * Check if size is in a specific breakpoint
     * @param {String} name 
     * @return {Boolean}
     */

  }, {
    key: 'only',
    value: function only(name) {
      return this.range(name, name);
    }

    /**
     * Check if size is between specific breakpoints
     * @param {String} from 
     * @param {String} to 
     */

  }, {
    key: 'range',
    value: function range(from, to) {
      return window.innerWidth >= this.sizes[from].min && window.innerWidth <= this.sizes[to].max;
    }
  }]);

  return Breakpoint;
}(_plugin2.default);

exports.default = Breakpoint;
//# sourceMappingURL=breakpoint.js.map