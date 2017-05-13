(function () {
  'use strict';

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
    }

    onSubmit(cb = () => {}) {
      this._submitCallback = cb;
    }

    _initEvents() {
      this.el.addEventListener('submit', this._onSubmit, false);
    }

    _getFormData() {
      const usernameEl = document.querySelector('.form__username');
      const messageEl = document.querySelector('.form__input');

      const formData = { message: messageEl.value, username: usernameEl.value, date: new Date() };

      return formData;
    }

    _onSubmit(ev) {
      ev.preventDefault();

      const formData = this._getFormData();
      this._submitCallback(formData);
    }

    reset() {
      // TODO: refactoring
      this.el.querySelector('.form__input').value = '';
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

  // export
  window.Form = Form;
}());
