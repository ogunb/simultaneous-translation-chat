import LanguagesList from './languages/languagesList';
import 'normalize.css';
import '../css/main.sass';

// eslint-disable-next-line
const API_KEY = process.env.API_KEY;
const poweredByYandex = `<a href="http://translate.yandex.com/">Powered by Yandex</a>`;

// Load languages to DOM.
LanguagesList();
