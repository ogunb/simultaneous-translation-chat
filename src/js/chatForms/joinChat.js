import directToChat from './directToChat';

function JoinChat() {
  const hashId = window.location.hash;
  const invitedBy = 'Josh';
  function onSubmit(e) {
    sessionStorage.setItem('chat-nick', e.target[0].value);
    directToChat();
  }
  function init() {
    const joinMessage = document.querySelector('.chat__main-page__join');
    joinMessage.textContent = `You've been invited to join translation chat by ${invitedBy}. Select your nick and your language to join the chat.`;
  }
  return {
    init,
    onSubmit,
  };
}

export default JoinChat;
