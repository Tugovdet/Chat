import Router from './modules/router';
import MainPage from './pages/main/mainPage';
import ChatPage from './pages/chat/chatPage';

const appEl = document.querySelector('.app');
const router = new Router({
  el: appEl,
});

const mainPage = new MainPage({
  el: document.createElement('div'),
});
const chatPage = new ChatPage({
  el: document.createElement('div'),
});

appEl.appendChild(mainPage.getElement());
appEl.appendChild(chatPage.getElement());

router.register('/main', mainPage);
router.register('/chat', chatPage);

router.start();

if (window.location.pathname === '/') {
  router.go('/main');
} else {
  router.go(window.location.pathname);
}
