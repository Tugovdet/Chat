export default class Router {
  constructor({ el }) {
    this.el = el;
    this.views = {};
    this.currentView = null;
  }

  /**
   * Goes to a certain URL
   * @param {string} path
   * @return {boolean} success
   */
  go(path) {
    const view = this.views[path];

    if (!view) {
      return false;
    }

    if (this.currentView) {
      this.currentView.hide();
    }

    view.show();
    this.currentView = view;

    window.history.pushState({}, '', path);

    return true;
  }

  /**
   * Registers views
   * @param {string} path
   * @param {PageView} pageView
   */
  register(path, pageView) {
    this.views[path] = pageView;
  }

  /**
   * Initializes events
   */
  start() {
    this.el.addEventListener('click', (ev) => {
      if (!(ev.target instanceof HTMLAnchorElement)) {
        return;
      }

      if (this.go(ev.target.getAttribute('href'))) {
        ev.preventDefault();
      }
    });

    window.addEventListener('popstate', () => {
      this.go(window.location.pathname);
    });
  }
}
