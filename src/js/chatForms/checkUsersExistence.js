import firebase from '../base';

export async function checkUsersExistence(hash, userNick) {
  let exist = true;
  await firebase.ref(`${hash}/users/${userNick}`).once('value', snapshot => {
    if (snapshot.val() === null) exist = false;
  });
  return exist;
}
