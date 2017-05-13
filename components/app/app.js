(function () {
  'use strict';

  /*
  * This is the mediator for all components of aplication
  * @params {HTMLElement} root node for the application
  */
  class App {
    constructor(rootEl) {
      this.rootEl = rootEl;
      this._createElements();
    }

    /*
    * Creates elements for components
    */
    _createElements() {
      this.formEl = document.createElement('div');
      this.formEl.classList.add('form-container');

      this.chatEl = document.createElement('div');
      this.chatEl.classList.add('chat-container');

      this.rootEl.appendChild(this.formEl);
      this.rootEl.appendChild(this.chatEl);
    }

    /*
    * Runs application, connects all components
    */
    run() {
      const form = new Form({ el: this.formEl });
      const chat = new Chat({ el: this.chatEl });

      form.onSubmit((formData) => {
        chat.addMessage(formData);
        chat.render();
        form.reset();
      });
    }
  }

  // export
  window.App = App;
})();