import Router from './modules/router';
import MainPage from './pages/main/mainPage';
import ChatPage from './pages/chat/chatPage';

const appEl = document.querySelector('.app');
const mainPageEl = document.createElement('div');
const chatPageEl = document.createElement('div');

appEl.appendChild(mainPageEl);
appEl.appendChild(chatPageEl);

const router = new Router({
  el: appEl,
});

const mainPage = new MainPage({
  el: mainPageEl,
});
const chatPage = new ChatPage({
  el: chatPageEl,
});

router.register('/main', mainPage);
router.register('/chat', chatPage);

router.start();

if (window.location.pathname === '/') {
  router.go('/main');
} else {
  router.go(window.location.pathname);
}
