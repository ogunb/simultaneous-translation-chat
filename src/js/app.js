import 'normalize.css';
import '../css/main.sass';
import LanguagesList from './languages/languagesList';
import JoinChat from './joinChat';
// eslint-disable-next-line
export const API_KEY = process.env.API_KEY;

const landing = document.querySelector('.chat__main-page');
let userNick = sessionStorage.getItem('chat-nick');
LanguagesList(); // Load languages to DOM.

if (!window.location.hash && !userNick) {
  landing.style.display = 'flex';
} else if (window.location.hash && !userNick) {
  const chatForm = document.querySelector('.chat__form');
  JoinChat.init();
  chatForm.addEventListener('submit', () => {
    JoinChat.onSubmit();
    ({ userNick } = JoinChat.userNick);
  });
} else {
  // window.scrollTo(0, document.body.scrollHeight);
}
