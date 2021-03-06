import { languages, flags } from './languages';

export default function LoadLanguages() {
  const selectEl = document.querySelector('.chat__lang');
  const optionsNodes = [];
  for (let i = 0; i < languages.length; i += 2) {
    const optionNode = `<option value="${languages[i + 1]}">${
      languages[i]
    } ${flags[languages[i + 1]] || ''}</option>`;
    optionsNodes.push(optionNode);
  }
  selectEl.innerHTML = optionsNodes
    .sort((a, b) => {
      const regex = />[a-z]+/gi;
      if (a.match(regex)[0] > b.match(regex)[0]) return 1;
      if (a.match(regex)[0] < b.match(regex)[0]) return -1;
      return 0;
    })
    .join('');
}
