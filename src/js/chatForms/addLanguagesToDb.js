import firebase from '../base';

export default async function addLanguagesToDb(hashId, lang) {
  let languagesInDb;
  await firebase.ref(`${hashId}/languages`).once('value', snapshot => {
    languagesInDb = snapshot.val();
  });
  if (languagesInDb && languagesInDb.includes(lang)) return;
  const newLanguages = languagesInDb ? [...languagesInDb, lang] : [lang];
  firebase.ref(`${hashId}/languages`).set(newLanguages);
}
