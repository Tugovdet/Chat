(function () {
  'use strict';

  class Chat {
    constructor({ el, data = { messages: [] } }) {
      this.el = el;
      this.data = data;
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
