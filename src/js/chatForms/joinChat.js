import firebase from '../base';
import directToChat from './directToChat';
import { checkUsers } from './checkUsers';

function JoinChat() {
  const hashId = window.location.hash.substring(1);
  const user = {};
  let invitedBy;

  async function onSubmit(e) {
    user.username = e.target[0].value;
    user.lang = e.target[1].value;
    const inputGroupNode = document.querySelector('.chat__input-group');
    const chatForm = document.querySelector('.chat__form');
    const userExists = await checkUsers(hashId, user.username);
    if (user.username === ('' || ' ')) {
      const invalidErrNode = document
        .createRange()
        .createContextualFragment(
          `<span class="form-is-invalid">Dude, you can't have a “space” as a username.</span>`
        );
      chatForm.insertBefore(invalidErrNode, inputGroupNode);
      e.target[0].classList.add('is-invalid');
    } else if (userExists) {
      const invalidErrNode = document
        .createRange()
        .createContextualFragment(
          `<span class="form-is-invalid">The nick already exists in this room dude.</span>`
        );
      chatForm.insertBefore(invalidErrNode, inputGroupNode);
      e.target[0].classList.add('is-invalid');
    } else {
      // sessionStorage.setItem('chat-nick', e.target[0].value);
      directToChat();
    }
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
