import firebase from '../base';
import { languages } from '../languages/languages';
import translateMessage from '../translate';

function MessageDOM() {
  function getMessageTemplate(username, messageObject, lastMessageOwner) {
    const chatMessagesWrapper = document.querySelector('.chat__messages');
    const messageLanguage =
      languages[languages.indexOf(messageObject.lang) - 1];
    let messageTemplate;
    if (messageObject.messageOwner === username) {
      if (lastMessageOwner === messageObject.messageOwner) {
        const sameOwnerMessage = document.querySelector(
          `.chat__message__info.same__owner.same__owner__last.${username}`
        );
        if (sameOwnerMessage) {
          sameOwnerMessage.classList.remove('same__owner__last');
        }
        messageTemplate = document.createRange().createContextualFragment(`
        <div class="chat__message__group chat__message__group--self">
          <div class="chat__message__info same__owner same__owner__last ${username}">
            <p class="chat__message">${messageObject.message}</p>
          </div>
        </div>`);
      } else {
        messageTemplate = document.createRange().createContextualFragment(`
        <div class="chat__message__group chat__message__group--self">
          <p class="chat__message__name ${username}">${username}</p>
          <div class="chat__message__info">
            <p class="chat__message">${messageObject.message}</p>
          </div>
        </div>`);
      }
    } else if (
      lastMessageOwner &&
      messageObject.messageOwner === lastMessageOwner
    ) {
      const sameOwnerMessage = document.querySelector(
        `.chat__message__info.same__owner.same__owner__last.${
          messageObject.messageOwner
        }`
      );
      const translationInfoNodes = document.querySelectorAll(
        `.chat__translation__info.${messageObject.messageOwner}`
      );
      if (sameOwnerMessage)
        sameOwnerMessage.classList.remove('same__owner__last');
      if (translationInfoNodes)
        translationInfoNodes[translationInfoNodes.length - 1].remove();
      messageTemplate = document.createRange().createContextualFragment(`
        <div class="chat__message__group chat__message__group--inc">
          <div class="chat__message__info same__owner same__owner__last ${
            messageObject.messageOwner
          }">
            <p class="chat__message">${messageObject.message}</p>
          </div>
          <br />
          <span class="chat__translation__info ${
            messageObject.messageOwner
          }">Translated from ${messageLanguage}.</span>
        </div>`);
    } else {
      messageTemplate = document.createRange().createContextualFragment(`
        <div class="chat__message__group chat__message__group--inc">
          <p class="chat__message__name">${messageObject.messageOwner}</p>
          <div class="chat__message__info">
            <p class="chat__message">${messageObject.message}</p>
          </div>
          <br />
          <span class="chat__translation__info ${
            messageObject.messageOwner
          }">Translated from ${messageLanguage}</span>
        </div>`);
    }
    chatMessagesWrapper.appendChild(messageTemplate);
  }
  async function init(hash, { username, lang }) {
    const chatScreenInfoDom = document.querySelector('.chat__screen__info');
    let lastMessageOwner = null;
    firebase
      .ref(`${hash}/originalMessages`)
      .on('child_added', async snapshot => {
        const messageObject = snapshot.val();
        messageObject.message = await translateMessage(messageObject, lang);
        getMessageTemplate(username, messageObject, lastMessageOwner);
        chatScreenInfoDom.innerHTML = '';
        window.scrollTo(0, document.body.scrollHeight);
        lastMessageOwner = messageObject.messageOwner;
      });
  }
  return {
    init,
  };
}

export default MessageDOM();
