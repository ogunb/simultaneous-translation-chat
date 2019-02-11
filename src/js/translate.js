export default async function translateMessage(
  messageObject,
  langToBeTranslated
) {
  const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY;
  const translatedMessage = await fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_KEY}&text=${
      messageObject.message
    }&lang=${messageObject.lang}-${langToBeTranslated}`
  )
    .then(res => res.json())
    .then(data => data.text[0]);
  return translatedMessage;
}
