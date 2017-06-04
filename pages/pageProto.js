export default class PageProto {
  constructor({ el }) {
    this.el = el;
  }

  /**
   * Shows element
   */
  show() {
    this.el.hidden = false;
  }

  /**
   * Hides element
   */
  hide() {
    this.el.hidden = true;
  }

  /**
   * Gets element
   * @return {HTMLElement} element
   */
  getElement() {
    return this.el;
  }
}
