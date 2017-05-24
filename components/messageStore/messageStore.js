/**
 * Message object
 * @typedef {object} messageObj
 * @property {string} user
 * @property {string} message
 * @property {string} date
 */

class MessageStore {
  constructor(reqUrl = 'https://korneyev-chat.firebaseio.com/messages.json') {
    this.reqUrl = reqUrl;
  }

  /**
   * Adds message to server store
   * @param {messageObj} message
   */
  add(message) {
    const req = new XMLHttpRequest();
    req.open('POST', this.reqUrl, true);
    req.send(JSON.stringify(message));
  }

  /**
   * Gets messages from server store
   * @return {promise} promise
   */
  httpGet() {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', this.reqUrl, true);

      req.addEventListener('load', (ev) => {
        if (req.readyState === 4) {
          resolve(JSON.parse(req.responseText));
        }
        // TODO: error handle?
      });
      req.send();
    });
  }
}

export { MessageStore };
