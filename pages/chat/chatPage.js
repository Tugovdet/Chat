import PageProto from '../pageProto';
import chatPageTemplate from './chatPage.tmpl.pug';
import App from '../../components/app/app';

export default class ChatPage extends PageProto {
  constructor({ el }) {
    super({ el });

    this.el.innerHTML = chatPageTemplate();

    this.hide();

    new App(this.el).run();
  }
}
