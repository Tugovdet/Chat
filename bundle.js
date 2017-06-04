/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(14).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageProto = function () {
  function PageProto(_ref) {
    var el = _ref.el;

    _classCallCheck(this, PageProto);

    this.el = el;
  }

  /**
   * Shows element
   */


  _createClass(PageProto, [{
    key: "show",
    value: function show() {
      this.el.hidden = false;
    }

    /**
     * Hides element
     */

  }, {
    key: "hide",
    value: function hide() {
      this.el.hidden = true;
    }

    /**
     * Gets element
     * @return {HTMLElement} element
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.el;
    }
  }]);

  return PageProto;
}();

exports.default = PageProto;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router(_ref) {
    var el = _ref.el;

    _classCallCheck(this, Router);

    this.el = el;
    this.views = {};
    this.currentView = null;
  }

  /**
   * Goes to a certain URL
   * @param {string} path
   * @return {boolean} success
   */


  _createClass(Router, [{
    key: 'go',
    value: function go(path) {
      var view = this.views[path];

      if (!view) {
        return false;
      }

      if (this.currentView) {
        this.currentView.hide();
      }

      view.show();
      this.currentView = view;

      window.history.pushState({}, '', path);

      return true;
    }

    /**
     * Registers views
     * @param {string} path
     * @param {PageView} pageView
     */

  }, {
    key: 'register',
    value: function register(path, pageView) {
      this.views[path] = pageView;
    }

    /**
     * Initializes events
     */

  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      this.el.addEventListener('click', function (ev) {
        if (!(ev.target instanceof HTMLAnchorElement)) {
          return;
        }

        if (_this.go(ev.target.getAttribute('href'))) {
          ev.preventDefault();
        }
      });

      window.addEventListener('popstate', function () {
        _this.go(window.location.pathname);
      });
    }
  }]);

  return Router;
}();

exports.default = Router;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pageProto = __webpack_require__(1);

var _pageProto2 = _interopRequireDefault(_pageProto);

var _chatPageTmpl = __webpack_require__(12);

var _chatPageTmpl2 = _interopRequireDefault(_chatPageTmpl);

var _app = __webpack_require__(5);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatPage = function (_PageProto) {
    _inherits(ChatPage, _PageProto);

    function ChatPage(_ref) {
        var el = _ref.el;

        _classCallCheck(this, ChatPage);

        var _this = _possibleConstructorReturn(this, (ChatPage.__proto__ || Object.getPrototypeOf(ChatPage)).call(this, { el: el }));

        _this.el.innerHTML = (0, _chatPageTmpl2.default)();

        _this.hide();

        new _app2.default(_this.el).run();
        return _this;
    }

    return ChatPage;
}(_pageProto2.default);

exports.default = ChatPage;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pageProto = __webpack_require__(1);

var _pageProto2 = _interopRequireDefault(_pageProto);

var _mainPageTmpl = __webpack_require__(13);

var _mainPageTmpl2 = _interopRequireDefault(_mainPageTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainPage = function (_PageProto) {
  _inherits(MainPage, _PageProto);

  function MainPage(_ref) {
    var el = _ref.el;

    _classCallCheck(this, MainPage);

    var _this = _possibleConstructorReturn(this, (MainPage.__proto__ || Object.getPrototypeOf(MainPage)).call(this, { el: el }));

    _this.el.innerHTML = (0, _mainPageTmpl2.default)();

    _this.hide();
    return _this;
  }

  return MainPage;
}(_pageProto2.default);

exports.default = MainPage;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messageStore = __webpack_require__(8);

var _chat = __webpack_require__(6);

var _form = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  /**
   * This is the mediator for all components of application
   * @param {HTMLElement} el - application container
   */
  function App(el) {
    _classCallCheck(this, App);

    this.el = el;
    this._createElements();
  }

  /**
   * Creates elements for components
   */


  _createClass(App, [{
    key: '_createElements',
    value: function _createElements() {
      this.formEl = document.createElement('div');
      this.formEl.classList.add('form-container');

      this.chatEl = document.createElement('div');
      this.chatEl.classList.add('chat-container');

      this.el.appendChild(this.formEl);
      this.el.appendChild(this.chatEl);
    }

    /**
     * Periodically updates messages in chat
     * @param {function} cb - callback
     * @param {number} delay - delay in ms
     */

  }, {
    key: '_setUpdateMessagesInterval',
    value: function _setUpdateMessagesInterval(cb, delay) {
      cb(); // first update without delay

      var self = this;
      function innerSetUpdateMessagesInterval() {
        self.updateMessageTimerId = setTimeout(function () {
          cb();
          innerSetUpdateMessagesInterval();
        }, delay);
      }

      innerSetUpdateMessagesInterval();
    }

    /**
     * Runs application, connects all components
     */

  }, {
    key: 'run',
    value: function run() {
      var messageStore = new _messageStore.MessageStore();
      var chat = new _chat.Chat({
        el: this.chatEl
      });
      var form = new _form.Form({ el: this.formEl });

      this.formEl.addEventListener('formDataReceived', function (ev) {
        chat.addMessage(ev.detail.formData);
        chat.render();
        chat.scrollToBottom();
        form.clearMessageInput();
        messageStore.add(ev.detail.formData);
      });

      this._setUpdateMessagesInterval(function () {
        messageStore.httpGet().then(function (messagesData) {
          if (messagesData === undefined || messagesData === null) {
            return;
          }

          // save last key to know if messages changed?
          chat.setMessages(Object.values(messagesData));
          chat.render();
        });
      }, 2000);
    }
  }]);

  return App;
}();

exports.default = App;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Message object
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {object} messageObj
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {string} user
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {string} message
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {string} date
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/**
 * Chat data
 * @typedef {object} chatData
 * @property {Array.<messageObj>} messages - messages
 */

/**
 * Chat options
 * @typedef {object} chatOptions
 * @property {HTMLElement} el - Chat container
 * @property {object} chatData - Chat data
 */

var _chatTmpl = __webpack_require__(10);

var _chatTmpl2 = _interopRequireDefault(_chatTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = function () {
  /**
   * Presents Chat, manages work with messages
   * @param {chatOptions} chatOptions - Chat options
   */
  function Chat(_ref) {
    var el = _ref.el,
        _ref$chatData = _ref.chatData,
        chatData = _ref$chatData === undefined ? { messages: [] } : _ref$chatData;

    _classCallCheck(this, Chat);

    this.el = el;
    this.data = chatData;
    this.data.messages = chatData.messages;

    this.render();
  }

  // TODO: template


  _createClass(Chat, [{
    key: 'render',
    value: function render() {
      this._saveScrollTop();
      this.el.innerHTML = (0, _chatTmpl2.default)(this.data);
      this._restoreScrollTop();
    }
  }, {
    key: '_saveScrollTop',
    value: function _saveScrollTop() {
      // if scroll is at the bottom
      if (this.el.scrollTop === this.el.scrollHeight - this.el.clientHeight) {
        // then it should be at the bottom after rerendering
        this.scrollToBottomNeeded = true;
        // if it is not
      } else {
        // it should be at the same place
        this.elScrollTop = this.el.scrollTop;
      }
    }
  }, {
    key: '_restoreScrollTop',
    value: function _restoreScrollTop() {
      if (this.scrollToBottomNeeded === true) {
        this.scrollToBottom();
        this.scrollToBottomNeeded = false;
      } else {
        this.el.scrollTop = this.elScrollTop;
      }
    }
  }, {
    key: 'scrollToBottom',
    value: function scrollToBottom() {
      this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight;
    }
  }, {
    key: 'addMessage',
    value: function addMessage(message) {
      this.data.messages.push(message);
    }
  }, {
    key: 'setMessages',
    value: function setMessages(messages) {
      this.data.messages = messages;
    }
  }]);

  return Chat;
}();

exports.Chat = Chat;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Form options
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {object} formOptions
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {HTMLElement} el - Form container
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _formTmpl = __webpack_require__(11);

var _formTmpl2 = _interopRequireDefault(_formTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = function () {
  /**
   * Presents Form, manages events
   * @param {formOptions} formOptions - Form options
   */
  function Form(formOptions) {
    _classCallCheck(this, Form);

    this.el = formOptions.el;
    this.render();

    this._onSubmit = this._onSubmit.bind(this);
    this._initEvents();

    this.usernameEl = document.querySelector('.form__username');
    this.messageEl = document.querySelector('.form__input');
  }

  _createClass(Form, [{
    key: '_initEvents',
    value: function _initEvents() {
      this.el.addEventListener('submit', this._onSubmit, false);
    }

    /**
     * Formats time to HH:MM where H - hours, M - minutes
     * @param {Date} date
     * @return {string} formated time
     */

  }, {
    key: '_formatTime',
    value: function _formatTime(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();

      if (hours < 10) {
        hours = '0' + hours;
      }

      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      return hours + ':' + minutes;
    }
  }, {
    key: '_getFormData',
    value: function _getFormData() {
      return {
        message: this.messageEl.value,
        user: this.usernameEl.value,
        date: this._formatTime(new Date())
      };
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit(ev) {
      ev.preventDefault();

      var customEv = new CustomEvent('formDataReceived', {
        detail: {
          formData: this._getFormData()
        }
      });

      this.el.dispatchEvent(customEv);
    }
  }, {
    key: 'clearMessageInput',
    value: function clearMessageInput() {
      this.messageEl.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      this.el.innerHTML = (0, _formTmpl2.default)();
    }
  }]);

  return Form;
}();

exports.Form = Form;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Message object
 * @typedef {object} messageObj
 * @property {string} user
 * @property {string} message
 * @property {string} date
 */

var MessageStore = function () {
  function MessageStore() {
    var reqUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'https://korneyev-chat.firebaseio.com/messages.json';

    _classCallCheck(this, MessageStore);

    this.reqUrl = reqUrl;
  }

  /**
   * Adds message to server store
   * @param {messageObj} message
   */


  _createClass(MessageStore, [{
    key: 'add',
    value: function add(message) {
      var req = new XMLHttpRequest();
      req.open('POST', this.reqUrl, true);
      req.send(JSON.stringify(message));
    }

    /**
     * Gets messages from server store
     * @return {promise} promise
     */

  }, {
    key: 'httpGet',
    value: function httpGet() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', _this.reqUrl, true);

        req.addEventListener('load', function (ev) {
          if (req.readyState === 4) {
            resolve(JSON.parse(req.responseText));
          }
          // TODO: error handle?
        });
        req.send();
      });
    }
  }]);

  return MessageStore;
}();

exports.MessageStore = MessageStore;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _router = __webpack_require__(2);

var _router2 = _interopRequireDefault(_router);

var _mainPage = __webpack_require__(4);

var _mainPage2 = _interopRequireDefault(_mainPage);

var _chatPage = __webpack_require__(3);

var _chatPage2 = _interopRequireDefault(_chatPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appEl = document.querySelector('.app');
var router = new _router2.default({
  el: appEl
});

var mainPage = new _mainPage2.default({
  el: document.createElement('div')
});
var chatPage = new _chatPage2.default({
  el: document.createElement('div')
});

appEl.appendChild(mainPage.getElement());
appEl.appendChild(chatPage.getElement());

router.register('/main', mainPage);
router.register('/chat', chatPage);

router.start();

if (window.location.pathname === '/') {
  router.go('/main');
} else {
  router.go(window.location.pathname);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (messages) {// iterate messages
;(function(){
  var $$obj = messages;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv class=\"chat__message\"\u003E\u003Cspan class=\"chat__author\"\u003E" + (pug.escape(null == (pug_interp = message.user) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"chat__date\"\u003E" + (pug.escape(null == (pug_interp = ' (' + (message.date || 'no date') + '): ') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = message.message) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv class=\"chat__message\"\u003E\u003Cspan class=\"chat__author\"\u003E" + (pug.escape(null == (pug_interp = message.user) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"chat__date\"\u003E" + (pug.escape(null == (pug_interp = ' (' + (message.date || 'no date') + '): ') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = message.message) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);
}.call(this,"messages" in locals_for_with?locals_for_with.messages:typeof messages!=="undefined"?messages:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cinput class=\"form__username\" required placeholder=\"Username\"\u003E\u003Cform class=\"form\"\u003E\u003Cinput class=\"form__input\" required placeholder=\"Message\"\u003E\u003Cinput class=\"form__submit\" type=\"submit\" value=\"Send\"\u003E\u003C\u002Fform\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Ch2\u003E\u003C\u002Fh2\u003E\u003Clabel\u003E\u003Ca href=\"\u002Fmain\"\u003E" + (pug.escape(null == (pug_interp = 'Return to the menu') ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Flabel\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Ch2 class=\"main-menu__header\"\u003E" + (pug.escape(null == (pug_interp = 'Main menu') ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003Cul class=\"main-menu\"\u003E\u003Clabel\u003E\u003Cli class=\"main-menu__chat\"\u003E\u003Ca href=\"\u002Fchat\"\u003E" + (pug.escape(null == (pug_interp = 'Chat') ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Flabel\u003E\u003Clabel\u003E\u003Cli class=\"main-menu__news\"\u003E\u003Ca href=\"#\"\u003E" + (pug.escape(null == (pug_interp = 'News') ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Flabel\u003E\u003Clabel\u003E\u003Cli class=\"main-menu__video\"\u003E\u003Ca href=\"#\"\u003E" + (pug.escape(null == (pug_interp = 'Video') ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Flabel\u003E\u003Clabel\u003E\u003Cli class=\"main-menu__audio\"\u003E\u003Ca href=\"#\"\u003E" + (pug.escape(null == (pug_interp = 'Audio') ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Flabel\u003E\u003C\u002Ful\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);