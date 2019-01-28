import firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'simultaneous-translation-chat.firebaseapp.com',
  databaseURL: 'https://simultaneous-translation-chat.firebaseio.com',
  projectId: 'simultaneous-translation-chat',
  storageBucket: 'simultaneous-translation-chat.appspot.com',
};
firebase.initializeApp(config);

export default firebase.database();

// ! set database.
// firebase
//   .database()
//   .ref(hash)
//   .set({}: object) -- refer to database.
// ! listen to changes for new messages and users for languages to translate.
// firebase
//   .database()
//   .ref(`${hash}/messages`)
//   .on('value', snapshot => {
//     console.log(snapshot.value);
//   });
