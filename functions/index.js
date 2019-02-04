const firebase = require('firebase');
const functions = require('firebase-functions');
const fetch = require('node-fetch');
require('dotenv').config();
const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: 'simultaneous-translation-chat.firebaseapp.com',
	databaseURL: 'https://simultaneous-translation-chat.firebaseio.com',
	projectId: 'simultaneous-translation-chat',
	storageBucket: 'simultaneous-translation-chat.appspot.com'
};
firebase.initializeApp(config);
const database = firebase.database();

exports.translateMessage = functions.database
	.ref('/{hash}/originalMessages/{originalMessage}')
	.onCreate((snapshot, context) => {
		const { hash } = context.params;
		const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY;
		const { message, lang, messageOwner } = snapshot.val();
		new Promise(resolve => {
			database.ref(`${hash}/languages`).once('value', langSnap => {
				resolve(langSnap.val());
			});
		})
			.then(languages => {
				languages
					.filter(language => language !== lang)
					.forEach(language => {
						fetch(
							`translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_KEY}&text=${message}&lang=${lang}-${language}`
						)
							.then(data => {
								const translatedMessage = data.text[0];
								let otherTranslatedMessages;
								database
									.ref(`${hash}/translatedMessages/${language}`)
									.once(
										'value',
										snap => (otherTranslatedMessages = snap.val())
									);
								const translatedMessageObj = {
									messageOwner,
									originalLang: lang,
									message: translatedMessage
								};
								const translatedMessages = otherTranslatedMessages
									? [...otherTranslatedMessages, translatedMessageObj]
									: [translatedMessageObj];
								return database
									.ref(`${hash}/translatedMessages/${language}`)
									.set(translatedMessages);
							})
							.catch(err => console.error(err));
					});
				return 'done';
			})
			.catch(err => console.log(err));
	});
