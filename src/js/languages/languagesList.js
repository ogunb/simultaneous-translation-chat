import { languages, flags } from './languages';

function LanguagesList() {
  const selectEl = document.querySelector('.chat__lang');
  const optionsNodes = [];
  for (let i = 0; i < languages.length; i += 2) {
    const optionNode = `<option value="${languages[i + 1]}">${
      languages[i]
    } ${flags[languages[i + 1]] || ' '}</option>`;
    optionsNodes.push(optionNode);
  }
  optionsNodes.sort().forEach(el => {
    selectEl.innerHTML += el;
  });
}

export default LanguagesList;
