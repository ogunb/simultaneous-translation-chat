import 'normalize.css';
import '../css/main.sass';
import LoadLanguages from './languages/LoadLanguages';
import JoinChat from './chatForms/joinChat';
import CreateChat from './chatForms/createChat';
import directToChat from './chatForms/directToChat';

// firebase.ref('548465465').set({
//   users: {
//     ogun: 'tr',
//     josh: 'en',
//     jose: 'es',
//   },
//   messages: [
//     {
//       originalMessage: 'naber kanka?',
//       translations: {
//         es: 'Como estas, amigo?',
//         en: "What's up, bro?",
//       },
//       messageOwner: 'ogun',
//     },
//     {
//       originalMessage: 'good bro, you?',
//       translations: {
//         es: 'Bien hermano, tu?',
//         tr: 'İyi kanka, sen?',
//       },
//       messageOwner: 'josh',
//     },
//   ],
// });

/* eslint-disable */
export const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY;
/* eslint-enable */

LoadLanguages();
const userNick = sessionStorage.getItem('chat-nick');
const chatForm = document.querySelector('.chat__form');
const loading = document.querySelector('.loading');
const landing = document.querySelector('.chat__main-page');
if (!window.location.hash) {
  loading.style.display = 'none';
  landing.style.display = 'flex';
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
  directToChat();
}
