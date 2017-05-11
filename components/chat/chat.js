(function () {
  'use strict';

  class Chat {
    constructor(options) {
      this.el = options.el;
      this.data = options.data;

      if (this.data.messages === undefined) {
        this.data.messages = [];
      }
    }

    render() {
      const messagesHTML = this.data.messages.map(mData =>
        `
          <div class='chat__message'>
            <span class='chat__author'>${mData.username}</span>
            ${mData.message}
          </div>
        `).join('');

      this.el.innerHTML = `
        <div class='chat'>
          ${messagesHTML}
        </div>
      `;
    }

    addMessage(message) {
      this.data.messages.push(message);
    }
  }

  // export
  window.Chat = Chat;
}());
