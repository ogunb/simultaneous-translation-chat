import MessageForm from '../chatMessages/MessageForm';

export default function directToChat(hash, user) {
  const landing = document.querySelector('.chat__main-page');
  const chatScreen = document.querySelector('.chat__screen');
  const loading = document.querySelector('.loading');
  loading.style.display = 'none';
  landing.style.display = 'none';
  chatScreen.style.display = 'flex';
  MessageForm(hash, user).init();
  window.scrollTo(0, document.body.scrollHeight);
}
