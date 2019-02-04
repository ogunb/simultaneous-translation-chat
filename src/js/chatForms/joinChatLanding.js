import firebase from '../base';
import createOrJoinRoom from './createOrJoinRoom';

function JoinChat() {
  const { hash: dirtyHash } = window.location;
  const hashId =
    dirtyHash.charAt(0) === '?'
      ? dirtyHash.substring(2)
      : dirtyHash.substring(1);
  const user = {};

  async function getRoomOwner() {
    const invitedBy = await firebase
      .ref(`${hashId}/owner`)
      .once('value')
      .then(snapshot => snapshot.val());
    return invitedBy;
  }

  async function onSubmit(e) {
    user.username = e.target[0].value;
    user.lang = e.target[1].value;
    if (user.username && user.lang) {
      createOrJoinRoom().init(hashId, user, e);
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
