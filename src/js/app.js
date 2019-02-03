import 'normalize.css';
import '../css/main.sass';
import LoadLanguages from './languages/LoadLanguages';
import JoinChat from './chatForms/joinChat';
import CreateChat from './chatForms/createChat';
import directToChat from './chatForms/directToChat';

/* eslint-disable */
export const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY;
/* eslint-enable */

LoadLanguages();
const user = JSON.parse(sessionStorage.getItem('chat-user'));
const hash = window.location.hash.substring(1);
const chatForm = document.querySelector('.chat__form');
const loading = document.querySelector('.loading');
const landing = document.querySelector('.chat__main-page');
if (!hash) {
  loading.style.display = 'none';
  landing.style.display = 'flex';
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    CreateChat().onSubmit(e);
  });
} else if (hash && !user) {
  JoinChat().init();
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    JoinChat().onSubmit(e);
  });
} else {
  directToChat(hash, user);
}
