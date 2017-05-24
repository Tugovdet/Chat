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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messageStore_messageStore__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chat_chat__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_form__ = __webpack_require__(2);




class App {
  /**
   * This is the mediator for all components of application
   * @param {HTMLElement} el - application container
   */
  constructor(el) {
    this.el = el;
    this._createElements();
  }

  /**
   * Creates elements for components
   */
  _createElements() {
    this.formEl = document.createElement('div');
    this.formEl.classList.add('form-container');

    this.chatEl = document.createElement('div');
    this.chatEl.classList.add('chat-container');

    this.el.appendChild(this.formEl);
    this.el.appendChild(this.chatEl);

    this.updateMessageTimerId = null;
  }

  /**
   * Periodically updates messages in chat
   * @param {function} cb - callback
   * @param {number} delay - delay in ms
   */
  _setUpdateMessagesInterval(cb, delay) {
    cb(); // first update without delay

    const self = this;
    function innerSetUpdateMessagesInterval() {
      self.updateMessageTimerId = setTimeout(() => {
        cb();
        innerSetUpdateMessagesInterval();
      }, delay);
    }

    innerSetUpdateMessagesInterval();
  }

  /**
   * Runs application, connects all components
   */
  run() {
    const messageStore = new __WEBPACK_IMPORTED_MODULE_0__messageStore_messageStore__["a" /* MessageStore */]();
    const chat = new __WEBPACK_IMPORTED_MODULE_1__chat_chat__["a" /* Chat */]({
      el: this.chatEl,
    });
    const form = new __WEBPACK_IMPORTED_MODULE_2__form_form__["a" /* Form */]({ el: this.formEl });

    this.formEl.addEventListener('formDataReceived', (ev) => {
      chat.addMessage(ev.detail.formData);
      chat.render();
      chat.scrollToBottom();
      form.clearMessageInput();
      messageStore.add(ev.detail.formData);
    });

    this._setUpdateMessagesInterval(() => {
      messageStore.httpGet().then((messagesData) => {
        if (messagesData === undefined || messagesData === null) {
          return;
        }

        // save last key to know if messages changed?
        chat.setMessages(Object.values(messagesData));
        chat.render();
      });
    }, 2000);
  }
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chat; });
/**
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

class Chat {
  /**
   * Presents Chat, manages work with messages
   * @param {chatOptions} chatOptions - Chat options
   */
  constructor(chatOptions) {
    this.el = chatOptions.el;
    this.data = chatOptions.chatData || {};
    this.data.messages = this.data.messages || [];

    this.render();
  }

  // TODO: template
  render() {
    this._saveScrollTop();

    this.el.innerHTML = this.data.messages.map(mData =>
      `
        <div class="chat__message">
          <span class="chat__author">${mData.user}</span>
          <span class="chat__time">(${mData.date || 'no date'}):</span>
          ${mData.message}
        </div>
      `).join('');

      this._restoreScrollTop();
  }

  _saveScrollTop() {
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

  _restoreScrollTop() {
    if (this.scrollToBottomNeeded === true) {
      this.scrollToBottom();
      this.scrollToBottomNeeded = false;
    } else {
      this.el.scrollTop = this.elScrollTop;
    }
  }

  scrollToBottom() {
    this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight;
  }

  addMessage(message) {
    this.data.messages.push(message);
  }

  setMessages(messages) {
    this.data.messages = messages;
  }
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Form; });
/**
 * Form options
 * @typedef {object} formOptions
 * @property {HTMLElement} el - Form container
 */

class Form {
  /**
   * Presents Form, manages events
   * @param {formOptions} formOptions - Form options
   */
  constructor(formOptions) {
    this.el = formOptions.el;
    this._onSubmit = this._onSubmit.bind(this);

    this._initEvents();
    this.render();

    this.usernameEl = document.querySelector('.form__username');
    this.messageEl = document.querySelector('.form__input');
  }

  onSubmit(cb = () => { }) {
    this._submitCallback = cb;
  }

  _initEvents() {
    this.el.addEventListener('submit', this._onSubmit, false);
  }

  /**
   * Formats time to HH:MM where H - hours, M - minutes
   * @param {Date} date
   * @return {string} formated time
   */
  _formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
  }

  _getFormData() {
    return {
      message: this.messageEl.value,
      user: this.usernameEl.value,
      date: this._formatTime(new Date()),
    };
  }

  _onSubmit(ev) {
    ev.preventDefault();

    const customEv = new CustomEvent('formDataReceived', {
      detail: {
        formData: this._getFormData(),
      },
    });

    this.el.dispatchEvent(customEv);
  }

  clearMessageInput() {
    this.messageEl.value = '';
  }

  render() {
    this.el.innerHTML = `
      <input class="form__username" required placeholder="Username" />
      <form class="form">
        <input class="form__input" required placeholder="Message" />
        <input type="submit" value="Send" class="form__submit" />
      </form>
    `;
  }
}




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageStore; });
/**
 * Message object
 * @typedef {object} messageObj
 * @property {string} user
 * @property {string} message
 * @property {string} date
 */

class MessageStore {
  constructor(reqUrl = 'https://korneyev-chat.firebaseio.com/messages.json') {
    this.reqUrl = reqUrl;
  }

  /**
   * Adds message to server store
   * @param {messageObj} message
   */
  add(message) {
    const req = new XMLHttpRequest();
    req.open('POST', this.reqUrl, true);
    req.send(JSON.stringify(message));
  }

  /**
   * Gets messages from server store
   * @return {promise} promise
   */
  httpGet() {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', this.reqUrl, true);

      req.addEventListener('load', (ev) => {
        if (req.readyState === 4) {
          resolve(JSON.parse(req.responseText));
        }
        // TODO: error handle?
      });
      req.send();
    });
  }
}




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_app_app__ = __webpack_require__(0);


'use strict';

const app = new __WEBPACK_IMPORTED_MODULE_0__components_app_app__["a" /* App */](document.querySelector('.app'));
app.run();


/***/ })
/******/ ]);