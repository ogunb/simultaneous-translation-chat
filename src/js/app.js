import 'normalize.css';
import '../css/main.sass';
import LoadLanguages from './languages/LoadLanguages';
import JoinChat from './chatForms/joinChatLanding';
import CreateChat from './chatForms/createChatLanding';
import createOrJoinRoom from './chatForms/createOrJoinRoom';

(function App() {
  const chatForm = document.querySelector('.chat__form');
  const loading = document.querySelector('.loading');
  const landing = document.querySelector('.chat__main-page');

  function firstLanding() {
    loading.style.display = 'none';
    landing.style.display = 'flex';
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      CreateChat.onSubmit(e);
    });
  }

  function guestForAnotherChat() {
    JoinChat.init();
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      JoinChat.onSubmit(e);
    });
  }

  function init() {
    const user = JSON.parse(sessionStorage.getItem('chat-user'));
    const hash = window.location.hash.substring(1);
    LoadLanguages();
    if (!hash) {
      firstLanding();
    } else if (hash && !user) {
      guestForAnotherChat();
    } else {
      createOrJoinRoom.directToChat(hash, user);
    }
  }
  return {
    init,
  };
})().init();
