(function () {
  'use strict';

  // TODO: how to define type
  /*
  * @typedef options
  * 
  */

  /*
  * Presents Chat, manages work with messages
  */
  class Chat {
    constructor(options) {
      this.el = options.el;
      this.data = options.data || {};
      this.data.messages = this.data.messages || [];

      this.render();
    }

    /* 
    * Formats time to HH:MM where H - hours, M - minutes
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

    // TODO: template
    render() {
      const messagesHTML = this.data.messages.map(mData =>
        `
          <div class="chat__message">
            <span class="chat__author">${mData.username}</span>
            <span class="chat__time">(${this._formatTime(mData.date)}):</span>
            ${mData.message}
          </div>
        `).join('');

      this.el.innerHTML = `
        <div class="chat">
          ${messagesHTML}
        </div>
      `;
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
