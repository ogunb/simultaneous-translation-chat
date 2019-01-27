import uuid from 'uuid';

function CreateChat() {
  let userNick;
  let language;
  function onSubmit(e) {
    const hashId = uuid();
    window.location.hash = hashId;
    userNick = e.target[0].value;
    language = e.target[1].value;
    sessionStorage.setItem('chat-nick', e.target[0].value);
  }
  return {
    onSubmit,
  };
}

export default CreateChat;
