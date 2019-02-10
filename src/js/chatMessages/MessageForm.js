import firebase from '../base';

function MessageForm() {
  async function sendMessage(e, hash, { username, lang }) {
    e.preventDefault();
    const message = e.target[0].value;
    const originalMessageObject = {
      messageOwner: username,
      message,
      lang,
    };
    const orjMessages =
      (await firebase
        .ref(`${hash}/originalMessages`)
        .once('value')
        .then(snapshot => snapshot.val())) || [];
    orjMessages.push(originalMessageObject);
    firebase.ref(`${hash}/originalMessages`).set(orjMessages);
  }
  function init(hash, { username, lang }) {
    const messageForm = document.querySelector('.chat__message__form');
    messageForm.addEventListener('submit', e => {
      sendMessage(e, hash, { username, lang });
      messageForm.reset();
    });
  }
  return {
    init,
  };
}

export default MessageForm();
