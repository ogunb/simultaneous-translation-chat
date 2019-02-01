import firebase from '../base';

function MessageForm(hash, { username, lang }) {
  function sendMessage(e) {
    e.preventDefault();
    const message = e.target[0].value;
    const timestamp = Date.now();
    const originalMessageObject = {
      messageOwner: username,
      message,
      lang,
    };
    firebase
      .ref(`${hash}/originalMessages/${timestamp}`)
      .set(originalMessageObject);
  }
  function init() {
    const messageForm = document.querySelector('.chat__message__form');
    messageForm.addEventListener('submit', e => {
      sendMessage(e);
      messageForm.reset();
    });
  }
  return {
    init,
  };
}

export default MessageForm;
