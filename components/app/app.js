(function () {
  'use strict';

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
      const messageStore = new MessageStore();
      const chat = new Chat({
        el: this.chatEl,
      });
      const form = new Form({ el: this.formEl });

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

          chat.setMessages(Object.values(messagesData)); // save last key?
          chat.render();
        });
      }, 2000);
    }
  }

  // export
  window.App = App;
}());
