import firebase from '../base';
import directToChat from './directToChat';
import { checkUsersExistence } from './checkUsersExistence';

function JoinChat() {
  const hashId = window.location.hash.substring(1);
  const user = {};
  let invitedBy;

  async function onSubmit(e) {
    const chatFormInvalidNode = document.querySelector('.form-is-invalid');
    user.username = e.target[0].value;
    user.lang = e.target[1].value;
    const userExists = await checkUsersExistence(hashId, user.username);
    if (user.username === ('' || ' ')) {
      chatFormInvalidNode.textContent = `Dude, you can't have a “space” as a username.`;
      e.target[0].classList.add('is-invalid');
    } else if (userExists) {
      chatFormInvalidNode.textContent = `This nick is already taken for this room dude, sorry.`;
      e.target[0].classList.add('is-invalid');
    } else {
      // sessionStorage.setItem('chat-nick', e.target[0].value);
      directToChat();
    }
  }

  async function getRoomOwner() {
    await firebase.ref(`${hashId}/owner`).once('value', snapshot => {
      invitedBy = snapshot.val();
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
