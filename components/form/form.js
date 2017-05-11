(function () {
  'use strict';

  class Form {
    constructor(options) {
      this.el = options.el;

      this._onSubmit = this._onSubmit.bind(this);
      this._initEvents();
    }

    onSubmit(cb = () => {}) {
      this._submitCallback = cb;
    }

    _initEvents() {
      this.addEventListener('submit', this._onSubmit, false);
    }

    _getFormData() {
      const message = Document.querySelector('textarea');

      const formData = { message };

      return formData;
    }

    _onSubmit(ev) {
      ev.preventDefault();

      const formData = this._getFormData();
      this.onSubmit(formData);
    }

    render() {
      this.el.innerHTML = `
        <input name="username" required placeholder="Username" />
        <form class="form">
          <textarea name="message" required placeholder="Message" rows=4></textarea>
          <br/>
          <input type="submit"/>
        </form>
      `;
    }
  }

  // export
  window.Form = Form;
}());
