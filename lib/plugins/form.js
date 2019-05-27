'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _hotkeysJs = require('hotkeys-js');

var _hotkeysJs2 = _interopRequireDefault(_hotkeysJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Plugin) {
  _inherits(Form, _Plugin);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
  }

  _createClass(Form, [{
    key: 'onInit',


    /**
     * Build plugin necessities
     */
    value: function onInit() {
      this.forms = [];
      this.listenForms();
    }

    /**
     * Watch all present forms
     */

  }, {
    key: 'listenForms',
    value: function listenForms() {
      var _this2 = this;

      this.forms = document.body.querySelectorAll('form');
      this.forms.forEach(function (form) {
        return _this2.watchForm(form);
      });
    }

    /**
     * Watch specific form
     * @param {HTMLElement} form 
     */

  }, {
    key: 'watchForm',
    value: function watchForm(form) {
      var _this3 = this;

      var els = form.querySelectorAll('input, textarea, select');

      // initial form check
      this.checkFormState(form);
      form.addEventListener('reset', function (e) {
        _this3.setSubmitted(form, els);
        _this3.checkFormState(form);
      });

      // watch children
      els.forEach(function (el) {

        // check validity
        ['keyup', 'blur'].forEach(function (event) {
          el.addEventListener(event, function (e) {
            el.classList.add('-touched');
            form.classList.add('-touched');
            _this3.checkState(el);
            _this3.checkFormState(form);
          });
        });

        // add -changed when value changes
        el.addEventListener('change', function (e) {
          el.classList.add('-changed');
          form.classList.add('-changed');
          _this3.checkState(el);
          _this3.checkFormState(form);
        });

        // check submit
        (0, _hotkeysJs2.default)('enter', { element: el }, function (e) {
          _this3.setSubmitted(form, els);
        });

        // initial check
        _this3.checkState(el);
      });

      // watch submit
      var btn = form.querySelector('[type=submit]');
      if (btn) btn.addEventListener('click', function (e) {
        _this3.setSubmitted(form, els);
      });
    }

    /**
     * Set whol form as submitted
     * @param {HTMLELement} form 
     * @param {NodeList} els 
     */

  }, {
    key: 'setSubmitted',
    value: function setSubmitted(form, els) {
      form.classList.add('-submitted');
      els.forEach(function (el) {
        el.blur();
        el.classList.add('-touched');
      });
    }

    /**
     * Check empty/invalid input state
     * @param {HTMLElement} el 
     */

  }, {
    key: 'checkState',
    value: function checkState(el) {

      // empty value
      el.classList[el.value ? 'remove' : 'add']('-empty');

      // invalid value
      var isInvalid = !el.checkValidity();
      el.classList[isInvalid ? 'add' : 'remove']('-invalid');
    }

    /**
     * Check invalid form state
     * @param {HTMLElement} form 
     */

  }, {
    key: 'checkFormState',
    value: function checkFormState(form) {
      var isInvalid = !form.checkValidity();
      form.classList[isInvalid ? 'add' : 'remove']('-invalid');
    }
  }]);

  return Form;
}(_plugin2.default);

exports.default = Form;
//# sourceMappingURL=form.js.map