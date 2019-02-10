import firebase from '../base';
import addLanguagesToDb from './addLanguagesToDb';
import MessageForm from '../chatMessages/MessageForm';
import MessageDOM from '../chatMessages/MessageDOM';

function createOrJoinRoom() {
  async function validateUsername(hashId, { username, lang }) {
    if (username === ('' || ' ')) {
      return {
        error: true,
        message: `Dude, you can't have a “space” as a username.`,
      };
    }
    const users = await firebase
      .ref(`${hashId}/users`)
      .once('value')
      .then(snapshot => snapshot.val());
    if (users && users[username])
      return {
        error: true,
        message: 'This nick is already taken for this room dude, sorry.',
      };
    const newUsers = users ? { ...users, [username]: lang } : { [username]: lang };
    firebase.ref(`${hashId}/users`).set(newUsers);
    return { error: false };
  }

  function directToChat(hash, user) {
    const landing = document.querySelector('.chat__main-page');
    const chatScreen = document.querySelector('.chat__screen');
    const loading = document.querySelector('.loading');
    loading.style.display = 'none';
    landing.style.display = 'none';
    chatScreen.style.display = 'flex';
    MessageForm.init(hash, user);
    MessageDOM.init(hash, user);
  }

  async function init(hashId, user, e) {
    const validateUsernameError = await validateUsername(hashId, user);
    if (validateUsernameError.error) {
      const chatFormInvalidNode = document.querySelector('.form-is-invalid');
      chatFormInvalidNode.textContent = validateUsernameError.message;
      e.target[0].classList.add('is-invalid');
      return validateUsernameError;
    }
    sessionStorage.setItem('chat-user', JSON.stringify(user));
    addLanguagesToDb(hashId, user.lang);
    directToChat(hashId, user);
    return validateUsernameError;
  }

  return {
    init,
    directToChat,
  };
}

export default createOrJoinRoom();
