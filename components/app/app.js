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
    }

    /**
     * Runs application, connects all components
     */
    run() {
      const form = new Form({ el: this.formEl });
      const chat = new Chat({ el: this.chatEl });

      // TODO: user event
      form.onSubmit((formData) => {
        chat.addMessage(formData);
        chat.render();
        chat.scrollToBottom();
        form.reset();
      });
    }
  }

  // export
  window.App = App;
}());
