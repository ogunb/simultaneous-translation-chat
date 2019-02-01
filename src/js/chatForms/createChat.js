import firebase from '../base';
import { createHash } from '../helpers';
import directToChat from './directToChat';

function CreateChat() {
  const hashId = createHash();
  const user = {};

  function createRoom({ username, lang }) {
    if (!username || !lang) return false;
    firebase.ref(`${hashId}/owner`).set(username);
    firebase.ref(`${hashId}/users`).set({ [username]: lang });
  }

  function onSubmit(e) {
    window.location.hash = hashId;
    user.username = e.target[0].value;
    user.lang = e.target[1].value;
    sessionStorage.setItem('chat-nick', e.target[0].value);
    createRoom(user);
    directToChat(hashId, user);
  }

  return {
    onSubmit,
  };
}

export default CreateChat;
