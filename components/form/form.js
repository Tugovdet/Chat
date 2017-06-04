/**
 * Form options
 * @typedef {object} formOptions
 * @property {HTMLElement} el - Form container
 */

import formTemplate from '../form/form.tmpl.pug';

class Form {
  /**
   * Presents Form, manages events
   * @param {formOptions} formOptions - Form options
   */
  constructor(formOptions) {
    this.el = formOptions.el;
    this.render();

    this._onSubmit = this._onSubmit.bind(this);
    this._initEvents();

    this.usernameEl = document.querySelector('.form__username');
    this.messageEl = document.querySelector('.form__input');
  }

  _initEvents() {
    this.el.addEventListener('submit', this._onSubmit, false);
  }

  /**
   * Formats time to HH:MM where H - hours, M - minutes
   * @param {Date} date
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

  _getFormData() {
    return {
      message: this.messageEl.value,
      user: this.usernameEl.value,
      date: this._formatTime(new Date()),
    };
  }

  _onSubmit(ev) {
    ev.preventDefault();

    const customEv = new CustomEvent('formDataReceived', {
      detail: {
        formData: this._getFormData(),
      },
    });

    this.el.dispatchEvent(customEv);
  }

  clearMessageInput() {
    this.messageEl.value = '';
  }

  render() {
    this.el.innerHTML = formTemplate();
  }
}

export { Form };
