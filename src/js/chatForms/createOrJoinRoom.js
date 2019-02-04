import firebase from '../base';
import addLanguagesToDb from './addLanguagesToDb';
import directToChat from './directToChat';

async function validateRoom(hashId, { username, lang }) {
  if (username === ('' || ' ')) {
    return {
      error: true,
      message: `Dude, you can't have a “space” as a username.`,
    };
  }
  let users;
  await firebase.ref(`${hashId}/users`).once('value', snapshot => {
    users = snapshot.val();
  });
  if (users && users[username])
    return {
      error: true,
      message: 'This nick is already taken for this room dude, sorry.',
    };
  const newUsers = users
    ? { ...users, [username]: lang }
    : { [username]: lang };
  firebase.ref(`${hashId}/users`).set(newUsers);
  return { error: false };
}

export default async function createOrJoinRoom(hashId, user, e) {
  const validateRoomError = await validateRoom(hashId, user);
  if (validateRoomError.error) {
    const chatFormInvalidNode = document.querySelector('.form-is-invalid');
    chatFormInvalidNode.textContent = validateRoomError.message;
    e.target[0].classList.add('is-invalid');
    return validateRoomError;
  }
  sessionStorage.setItem('chat-user', JSON.stringify(user));
  addLanguagesToDb(hashId, user.lang);
  directToChat(hashId, user);
  return validateRoomError;
}
