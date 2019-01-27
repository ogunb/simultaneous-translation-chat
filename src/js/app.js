import 'normalize.css';
import '../css/main.sass';
import LanguagesList from './languages/languagesList';
import JoinChat from './chatForms/joinChat';
import CreateChat from './chatForms/createChat';
/* eslint-disable */
export const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY;
export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
/* eslint-enable */

LanguagesList(); // Load languages to DOM.
const landing = document.querySelector('.chat__main-page');
const chatScreen = document.querySelector('.chat__screen');
const chatForm = document.querySelector('.chat__form');
const userNick = sessionStorage.getItem('chat-nick');
if (!window.location.hash) {
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    CreateChat().onSubmit(e);
  });
} else if (window.location.hash && !userNick) {
  JoinChat().init();
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    JoinChat().onSubmit(e);
  });
} else {
  landing.style.display = 'none';
  chatScreen.style.display = 'flex';
  window.scrollTo(0, document.body.scrollHeight);
}
