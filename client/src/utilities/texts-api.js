import sendRequest from './send-request'
const BASE_URL = '/api/texts'

export async function tokenizeText(text) {
  return sendRequest(`${BASE_URL}/tokenize`, 'POST', { text })
}

export function getAll() {
  return sendRequest(`${BASE_URL}`)
}

export const addNewText = (textData) =>
  sendRequest('/api/demo/texts', 'POST', textData);

export const deleteText = (userId, textId) =>
  sendRequest(`/api/texts/${userId}/text/${textId}`, 'DELETE');


export function getText(id) {
  return sendRequest(`${BASE_URL}/${id}`)
}

export const saveWord = (wordObj, textId) =>
  sendRequest(`${BASE_URL}/${textId}/save`, 'POST', {
    chinese: wordObj.charGroup,
    pinyin: wordObj.pinyin,
    english: wordObj.meaning,
  });

export function getSavedWords(textId) {
  return sendRequest(`${BASE_URL}/${textId}/get-saved-words`);
}

export function translateSentence(sentence) {
  return sendRequest(`${BASE_URL}/translate`, 'POST', { sentence })
}

export function archiveText(text, id) {
  return sendRequest(`${BASE_URL}/${id}/archive`, 'POST', { text })
}

export function favoriteText(text, id) {
  return sendRequest(`${BASE_URL}/${id}/favorite`, 'POST', { text })
}

export const getUserTexts = async (userId) => {
  return sendRequest(`${BASE_URL}/${userId}`, 'GET');
};