(function () {
  'use strict';

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

  // export
  window.Chat = Chat;
}());
