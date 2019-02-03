import firebase from '../base';

export default async function createOrJoinRoom(hashId, { username, lang }) {
  if (username === '' || ' ')
    throw new Error(`Dude, you can't have a “space” as a username.`);
  let users;
  await firebase.ref(`${hashId}/users`).once('value', snapshot => {
    users = snapshot.val();
  });
  if (users[username])
    throw new Error('This nick is already taken for this room dude, sorry.');
  const newUsers = { ...users, [username]: lang };
  firebase.ref(`${hashId}/users`).set(newUsers);
}
