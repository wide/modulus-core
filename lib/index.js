'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _string = require('./utils/string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modulus = function (_EventEmitter) {
  _inherits(Modulus, _EventEmitter);

  /**
   * New Modulus instance
   * @param {Object} opts 
   * @param {Object}  opts.config
   * @param {Object}  opts.plugins - list of plugins to register
   * @param {Object}  opts.controllers - list of controller to register
   * @param {Object}  opts.components - list of regular components to register
   * @param {Object}  opts.webComponents - list of web components to register
   */
  function Modulus(_ref) {
    var _ref$config = _ref.config,
        config = _ref$config === undefined ? {} : _ref$config,
        _ref$plugins = _ref.plugins,
        plugins = _ref$plugins === undefined ? {} : _ref$plugins,
        _ref$controllers = _ref.controllers,
        controllers = _ref$controllers === undefined ? {} : _ref$controllers,
        _ref$components = _ref.components,
        components = _ref$components === undefined ? {} : _ref$components,
        _ref$webComponents = _ref.webComponents,
        webComponents = _ref$webComponents === undefined ? {} : _ref$webComponents;

    _classCallCheck(this, Modulus);

    // catalog of available classes
    var _this = _possibleConstructorReturn(this, (Modulus.__proto__ || Object.getPrototypeOf(Modulus)).call(this));

    _this._plugins = plugins;
    _this._controllers = controllers;
    _this._components = components;
    _this._webComponents = webComponents;

    // catalog of instances
    _this.plugins = {};
    _this.controllers = {};
    _this.components = {};
    _this.webComponents = {};
    _this.ready = false;

    // assign config
    _this.config = Object.assign({
      debug: false,
      expose: false,
      seekAttribute: 'data-mod'
    }, config);

    // assign logger
    _this.log = new _logger2.default({ active: _this.config.debug, prefix: '' });

    // assign itself to window object if expose requested
    if (_this.config.expose) {
      window.$mod = _this;
    }

    // start parsing
    _this.log('Modulus start (' + (process.env.PRODUCTION ? 'PROD' : 'DEV') + ' mode)');
    document.addEventListener('DOMContentLoaded', function (e) {
      return _this.build();
    });
    return _this;
  }

  /**
   * Build plugins, controller and components
   */


  _createClass(Modulus, [{
    key: 'build',
    value: function build() {
      this.registerPlugins();
      this.registerControllers();
      this.registerComponents();
      this.initComponents();
      this.registerCustomElements();
      this.observeDestruction();
      this.emit('ready');
    }

    /**
     * Rebuild components
     * @param {HTMLElement} root
     */

  }, {
    key: 'rebuild',
    value: function rebuild(root) {
      this.registerComponents(root);
      this.initComponents();
      this.emit('ready');
    }

    /**
     * Add plugins
     */

  }, {
    key: 'registerPlugins',
    value: function registerPlugins() {
      for (var name in this._plugins) {

        // attach plugin to modulus and vice-versa
        this.plugins[name] = this._plugins[name];
        this.plugins[name].$modulus = this;
        this.plugins[name].log = new _logger2.default({
          active: this.config.debug,
          prefix: '<' + name + '>'
        });

        // attach plugin to Component class
        _component2.default.prototype['$' + name] = this.plugins[name];

        // init plugin
        this.log('- plugin <' + name + '> registered');
        if (this.plugins[name].onSetup) this.plugins[name].onSetup();
        if (this.plugins[name].onInit) this.plugins[name].onInit();
      }
    }

    /**
     * Register controller components
     */

  }, {
    key: 'registerControllers',
    value: function registerControllers() {
      for (var name in this._controllers) {

        // instanciate controller component
        this.controllers[name] = this.instanciateComponent(name, this._controllers[name], document.body, true);

        // init controller
        this.log('- controller [' + name + '] registered');
        if (this.controllers[name].onInit) this.controllers[name].onInit();
      }
    }

    /**
     * Parse document and instanciate all components in [data-mod] attributes
     * @param {HTMLElement} root
     */

  }, {
    key: 'registerComponents',
    value: function registerComponents() {
      var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

      var els = root.querySelectorAll('[' + this.config.seekAttribute + ']');
      for (var i = 0; i < els.length; i++) {

        // seek related module class
        var name = els[i].getAttribute(this.config.seekAttribute);
        var ComponentClass = this._components[name];

        // register component instance
        if (ComponentClass) {

          // new regular component
          var instance = this.instanciateComponent(name, ComponentClass, els[i]);
          this.components[instance.$uid] = instance;
          this.log('- component [' + instance.$uid + '] registered');
        } else this.log.error('Unknown component [' + name + ']');
      }
    }

    /**
     * Observe component removal from DOM
     */

  }, {
    key: 'observeDestruction',
    value: function observeDestruction() {
      var _this2 = this;

      new MutationObserver(function (e) {

        for (var uid in _this2.components) {
          if (!document.body.contains(_this2.components[uid].el)) {
            if (_this2.components[uid].onDestroy) {
              _this2.components[uid].onDestroy();
            }
            delete _this2.components[uid];
          }
        }
      }).observe(document.body, { childList: true, subtree: true });
    }

    /**
     * Run onInit on regular components
     */

  }, {
    key: 'initComponents',
    value: function initComponents() {
      for (var uid in this.components) {
        if (this.components[uid].onInit && !this.components[uid].__initialized) {
          this.components[uid].onInit();
          this.components[uid].__initialized = true;
        }
      }
    }

    /**
     * Register components as native custom elements
     */

  }, {
    key: 'registerCustomElements',
    value: function registerCustomElements() {
      var _this3 = this;

      var _loop = function _loop(name) {

        try {

          // hyphenize tag name (FooBar -> foo-bar)
          var tagname = name.replace(/[A-Z]/g, function (m) {
            return '-' + m.toLowerCase();
          });
          if (tagname[0] === '-') tagname = tagname.substr(1);

          // attach modulus instance to component
          var ComponentClass = _this3._webComponents[name];
          ComponentClass.prototype.$modulus = _this3;

          // register to custom elements registry
          var self = _this3;
          _this3.log('Custom Element [' + tagname + '] registered');
          window.customElements.define(tagname, function (_HTMLElement) {
            _inherits(_class, _HTMLElement);

            // new web component
            function _class() {
              _classCallCheck(this, _class);

              var _this4 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

              var instance = self.instanciateComponent(name, ComponentClass, _this4);
              self.components[instance.$uid] = instance;
              return _this4;
            }

            // attached to DOM


            _createClass(_class, [{
              key: 'connectedCallback',
              value: function connectedCallback() {
                if (this.$component.onInit) this.$component.onInit();
                if (self.ready && this.$component.onReady) this.$component.onReady();
              }

              // detached from DOM

            }, {
              key: 'disconnectedCallback',
              value: function disconnectedCallback() {
                if (this.$component.onDestroy) this.$component.onDestroy();
              }
            }]);

            return _class;
          }(HTMLElement));
        } catch (err) {
          _this3.log.error(err);
          return 'continue';
        }
      };

      for (var name in this._webComponents) {
        var _ret = _loop(name);

        if (_ret === 'continue') continue;
      }
    }

    /**
     * Instance component and bind related data
     * @param {String} name 
     * @param {Component} ModuleClass 
     * @param {HTMLElement} el 
     * @param {Boolean} unique 
     * @return {Component}
     */

  }, {
    key: 'instanciateComponent',
    value: function instanciateComponent(name, ComponentClass, el) {
      var unique = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


      // parse attributes and data-attributes
      var attrs = {};
      for (var i = 0; i < el.attributes.length; i++) {
        attrs[el.attributes[i]] = el.getAttribute(el.attributes[i]);
      }

      // lookup [ref] children
      var refs = {};
      var els = Array.from(el.querySelectorAll('*:not([' + this.config.seekAttribute + ']) [ref]'));
      els.concat.apply(els, _toConsumableArray(Array.from(el.children).filter(function (child) {
        return child.hasAttribute('ref');
      }))); // ie11 fix for direct child ref
      for (var _i = 0; _i < els.length; _i++) {
        var ref = els[_i].getAttribute('ref');
        refs[ref] = els[_i];
      }

      // instanciate component object with attributes
      var instance = new ComponentClass(el, { attrs: attrs, refs: refs, dataset: el.dataset });

      // bind identity data to instance
      instance.$uid = unique ? name : name + '#' + (el.id || (0, _string.randomHash)());

      // bind logger to instance
      instance.log = new _logger2.default({ active: this.config.debug, prefix: '[' + instance.$uid + ']' });

      // bind modulus to instance (needed for event dispatching)
      instance.$modulus = this;

      // bind instance to element
      el.$component = instance;

      return instance;
    }

    /**
     * Get component by uid
     * @param {String} uid 
     * @return {Component}
     */

  }, {
    key: 'get',
    value: function get(uid) {
      return this.components[uid];
    }
  }]);

  return Modulus;
}(_tinyEmitter2.default);

exports.default = Modulus;
//# sourceMappingURL=index.js.map