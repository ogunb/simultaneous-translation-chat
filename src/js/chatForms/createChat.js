import firebase from '../base';
import { createHash } from '../helpers';
import createOrJoinRoom from './createOrJoinRoom';

function CreateChat() {
  const hashId = createHash();
  const user = {};

  async function onSubmit(e) {
    user.username = e.target[0].value;
    user.lang = e.target[1].value;
    if (user.username && user.lang) {
      const createOrJoinRoomErr = await createOrJoinRoom(hashId, user, e);
      if (!createOrJoinRoomErr.error) {
        window.location.hash = hashId;
        firebase.ref(`${hashId}/owner`).set(user.username);
      }
    }
  }

  return {
    onSubmit,
  };
}

export default CreateChat;
