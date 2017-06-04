import PageProto from '../pageProto';
import mainPageTemplate from './mainPage.tmpl.pug';

export default class MainPage extends PageProto {
  constructor({ el }) {
    super({ el });

    this.el.innerHTML = mainPageTemplate();

    this.hide();
  }
}
