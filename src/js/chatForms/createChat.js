import firebase from '../base';
import { createHash } from '../helpers';
import directToChat from './directToChat';
import createOrJoinRoom from './createOrJoinRoom';

function CreateChat() {
  const hashId = createHash();
  const user = {};

  function createRoom({ username, lang }) {
    if (!username || !lang) return false;
    firebase.ref(`${hashId}/owner`).set(username);
    return createOrJoinRoom(hashId, user);
  }

  function onSubmit(e) {
    window.location.hash = hashId;
    user.username = e.target[0].value;
    user.lang = e.target[1].value;
    sessionStorage.setItem('chat-user', JSON.stringify(user));
    try {
      createRoom(user);
      directToChat(hashId, user);
    } catch (err) {
      const chatFormInvalidNode = document.querySelector('.form-is-invalid');
      chatFormInvalidNode.textContent = err;
      e.target[0].classList.add('is-invalid');
    }
  }

  return {
    onSubmit,
  };
}

export default CreateChat;
