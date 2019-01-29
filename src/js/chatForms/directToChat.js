export default function directToChat() {
  const landing = document.querySelector('.chat__main-page');
  const chatScreen = document.querySelector('.chat__screen');
  landing.style.display = 'none';
  chatScreen.style.display = 'flex';
  window.scrollTo(0, document.body.scrollHeight);
}
