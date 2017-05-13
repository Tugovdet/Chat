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
      // TODO: search by names, delete temporary css classes
      const usernameEl = document.querySelector('[name="username"]');
      const messageEl = document.querySelector('[name="message"]');

      const formData = { message: messageEl.value, username: usernameEl.value, date: new Date() };

      return formData;
    }

    _onSubmit(ev) {
      ev.preventDefault();

      const formData = this._getFormData();
      this._submitCallback(formData);
    }

    reset() {
      this.el.querySelector('.form').reset();
    }

    render() {
      this.el.innerHTML = `
        <input class="js-username" name="username" required placeholder="Username" />
        <form class="form">
          <textarea class="js-message" name="message" required placeholder="Message" rows=4></textarea>
          <br/>
          <input type="submit"/>
        </form>
      `;
    }
  }

  // export
  window.Form = Form;
}());
