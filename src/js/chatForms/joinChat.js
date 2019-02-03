import firebase from '../base';
import directToChat from './directToChat';
import createOrJoinRoom from './createOrJoinRoom';

function JoinChat() {
  const { hash: dirtyHash } = window.location;
  const hashId =
    dirtyHash.charAt(0) === '?'
      ? dirtyHash.substring(2)
      : dirtyHash.substring(1);
  const user = {};

  async function getRoomOwner() {
    let invitedBy;
    await firebase.ref(`${hashId}/owner`).once('value', snapshot => {
      invitedBy = snapshot.val();
    });
    return invitedBy;
  }

  async function onSubmit(e) {
    user.username = e.target[0].value;
    user.lang = e.target[1].value;
    try {
      await createOrJoinRoom(hashId, user);
      sessionStorage.setItem('chat-user', JSON.stringify(user));
      directToChat(hashId, user);
    } catch (err) {
      const chatFormInvalidNode = document.querySelector('.form-is-invalid');
      chatFormInvalidNode.textContent = err;
      e.target[0].classList.add('is-invalid');
    }
  }

  async function init() {
    const joinMessage = document.querySelector('.chat__main-page__join');
    const loading = document.querySelector('.loading');
    const landing = document.querySelector('.chat__main-page');
    const button = document.querySelector('.chat__start');
    const invitedBy = await getRoomOwner();
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
