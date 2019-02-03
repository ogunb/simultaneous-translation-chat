const functions = require('firebase-functions');

exports.translateMessage = functions.database
	.ref('/originalMessages/{originalMessage}')
	.onCreate((snapshot, context) => {
		const originalMessageObj = snapshot.val();
	});
