import { createHash } from '../helpers';
import directToChat from './directToChat';

function CreateChat() {
  const hashId = createHash();
  let userNick;
  let language;
  function onSubmit(e) {
    window.location.hash = hashId;
    userNick = e.target[0].value;
    language = e.target[1].value;
    sessionStorage.setItem('chat-nick', e.target[0].value);
    directToChat();
  }
  return {
    onSubmit,
  };
}

export default CreateChat;
