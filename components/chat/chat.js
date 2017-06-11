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

import chatTemplate from '../chat/chat.tmpl.pug';

class Chat {
  /**
   * Presents Chat, manages work with messages
   * @param {chatOptions} chatOptions - Chat options
   */
  constructor({ el, chatData = { messages: [] } }) {
    this.el = el;
    this.data = chatData;
    this.data.messages = chatData.messages;

    this.render();
    this.scrollToBottom();
  }

  render() {
    this._saveScrollTop();
    this.el.innerHTML = chatTemplate(this.data);
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

export { Chat };
