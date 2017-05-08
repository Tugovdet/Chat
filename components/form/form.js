(function () {
  'use strict';

  class Form {
    constructor({ el }) {
      this.el = el;
    }

    render() {
      this.el.innerHTML = `
      <form>
        <textarea name='message' rows=4></textarea>
        <br/>
        <input type='submit'/>
      </form>    
      `;
    }
  }

  // export
  window.Form = Form;
}());
