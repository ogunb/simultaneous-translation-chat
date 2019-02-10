import firebase from '../base';
import { languages } from '../languages/languages';

function MessageDOM() {
  function getMessageTemplate(username, messageObject, lastMessageOwner) {
    const chatMessagesWrapper = document.querySelector('.chat__messages');
    const messageLanguage =
      languages[languages.indexOf(messageObject.lang) - 1];
    let messageTemplate;
    if (
      lastMessageOwner === username &&
      messageObject.messageOwner === username
    ) {
      const sameOwnerMessage = document.querySelector(
        `.chat__message__info.same__owner.same__owner__last.${username}`
      );
      if (sameOwnerMessage) {
        console.log(sameOwnerMessage);
        sameOwnerMessage.classList.remove('same__owner__last');
      }
      messageTemplate = document.createRange().createContextualFragment(`
        <div class="chat__message__group chat__message__group--self">
          <div class="chat__message__info same__owner same__owner__last ${username}">
            <p class="chat__message">${messageObject.message}</p>
          </div>
        </div>`);
    } else if (messageObject.messageOwner === username) {
      messageTemplate = document.createRange().createContextualFragment(`
        <div class="chat__message__group chat__message__group--self">
          <p class="chat__message__name">${username}</p>
          <div class="chat__message__info">
            <p class="chat__message">${messageObject.message}</p>
          </div>
        </div>`);
    } else if (
      lastMessageOwner &&
      messageObject.messageOwner === lastMessageOwner
    ) {
      const sameOwnerMessage = document.querySelector(
        `.chat__message__info.same__owner.same__owner__last.${
          messageObject.messageOwner
        }`
      );
      const translationInfoNode = document.querySelector(
        `.chat__translation__info.${messageObject.messageOwner}`
      );
      if (sameOwnerMessage)
        sameOwnerMessage.classList.remove('same__owner__last');
      translationInfoNode.remove();
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
  async function firstLanding(hash, username) {
    const chatScreenInfoDom = document.querySelector('.chat__screen__info');
    const sendFirstMessageTemplate = `<div class="chat__screen__first-message"><div class="chat__screen__first-message__arrow"><svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 100 125"
    enable-background="new 0 0 100 100"
    xml:space="preserve"
  >
    <g>
      <path
        d="M14.78,84.217c-0.199,0-0.4-0.059-0.575-0.183c-0.451-0.318-0.56-0.942-0.241-1.394   c9.289-13.183,21.793-16.172,36.162-8.645c7.431,3.893,13.705,4.249,18.648,1.059C85.875,64.019,83.229,14.887,83.2,14.392   c-0.032-0.551,0.389-1.024,0.94-1.056c0.562-0.042,1.024,0.389,1.057,0.94c0.12,2.068,2.738,50.793-15.337,62.459   c-5.595,3.609-12.545,3.285-20.662-0.967c-13.544-7.095-24.849-4.395-33.6,8.025C15.404,84.07,15.095,84.217,14.78,84.217z"
      />
    </g>
    <g>
      <path
        d="M24.512,84.95H13.71c-0.301,0-0.585-0.135-0.775-0.369c-0.19-0.233-0.265-0.54-0.204-0.834l2.019-9.763   c0.112-0.541,0.638-0.892,1.182-0.777c0.541,0.112,0.889,0.641,0.777,1.182l-1.771,8.561h9.574c0.552,0,1,0.448,1,1   S25.064,84.95,24.512,84.95z"
      />
    </g>
  </svg></div><h2 class="chat__screen__first-message__info">Copy url from address bar and share it with people you'd like to communicate.</h2></div>`;
    const allMessages = await firebase
      .ref(`${hash}/originalMessages`)
      .once('value')
      .then(snapshot => snapshot.val());
    if (!allMessages) {
      chatScreenInfoDom.innerHTML = sendFirstMessageTemplate;
    } else {
      let lastMessageFrom;
      allMessages.forEach(messageObject => {
        getMessageTemplate(username, messageObject, lastMessageFrom);
        lastMessageFrom = messageObject.messageOwner;
        window.scrollTo(0, document.body.scrollHeight);
      });
      chatScreenInfoDom.innerHTML = '';
    }
  }
  function newMessage(hash) {
    firebase.ref(`${hash}/originalMessages`).on('child_added', snapshot => {
      console.log(snapshot.val());
    });
  }
  async function init(hash, { username, lang }) {
    await firstLanding(hash, username);
    // newMessage(hash);
  }
  return {
    init,
  };
}

export default MessageDOM();
