import firebase from '../base';

export default async function addLanguagesToDb(hashId, lang) {
  const languagesInDb = await firebase
    .ref(`${hashId}/languages`)
    .once('value')
    .then(snapshot => snapshot.val());
  if (languagesInDb && languagesInDb.includes(lang)) return;
  const newLanguages = languagesInDb ? [...languagesInDb, lang] : [lang];
  firebase.ref(`${hashId}/languages`).set(newLanguages);
}
