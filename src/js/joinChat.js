import uuid from 'uuid';

function JoinChat() {
  let userNick;
  let invitedBy;
  function onSubmit() {
    const locationHash = window.location.hash;
    console.log('asd');
  }
  function init() {
    const joinMessage = document.querySelector('.chat__main-page__join');
    joinMessage.textContent = `You've been invited to join translation chat by ${nick}. Select your nick and your language to join the chat.`;
  }
  return {
    init,
    userNick,
    onSubmit,
  };
}

export default JoinChat;
