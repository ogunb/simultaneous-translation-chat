import { createHash } from '../helpers';
import directToChat from './directToChat';

function CreateChat() {
  const hashId = createHash();
  const user = {};

  function onSubmit(e) {
    window.location.hash = hashId;
    user.username = e.target[0].value;
    user.lang = e.target[1].value;
    // sessionStorage.setItem('chat-nick', e.target[0].value);
    directToChat();
  }

  return {
    onSubmit,
  };
}

export default CreateChat;
