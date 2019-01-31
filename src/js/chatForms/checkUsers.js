import firebase from '../base';

export async function checkUsers(hash, currUser) {
  let exist = true;
  await firebase.ref(`${hash}/users/${currUser}`).once('value', snapshot => {
    if (snapshot.val() === null) exist = false;
  });
  return exist;
}
