import firebase from '../base';
import directToChat from './directToChat';

function JoinChat() {
  const hashId = window.location.hash.substring(1);
  let invitedBy;

  function onSubmit(e) {
    sessionStorage.setItem('chat-nick', e.target[0].value);
    directToChat();
  }

  async function getRoomOwner() {
    await firebase.ref(`${hashId}/owner`).once('value', async snapshot => {
      invitedBy = await snapshot.val();
    });
  }

  async function init() {
    const joinMessage = document.querySelector('.chat__main-page__join');
    const loading = document.querySelector('.loading');
    const landing = document.querySelector('.chat__main-page');
    const button = document.querySelector('.chat__start');
    await getRoomOwner();
    joinMessage.innerHTML = `You've been invited to join translation chat by <span class="bold">${invitedBy}</span>. Select your nick and language to join the chat.`;
    button.textContent = `Join the chat`;
    loading.style.display = 'none';
    landing.style.display = 'flex';
  }

  return {
    init,
    onSubmit,
  };
}

export default JoinChat;
