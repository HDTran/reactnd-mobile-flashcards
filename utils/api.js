import { AsyncStorage } from 'react-native';

const FLASHCARD_STORAGE_KEY = 'flashcards:decks';

export function getDecks () {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((data) => {
      if(data !== null && data !== undefined) {
        return JSON.parse(data);
      }
      else {
        return {};
      }
    });
}

export function getDeck (title) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((data) => {
      if(data !== null) {
        data = JSON.parse(data);
        if(data[title] !== undefined) {
          return data[title];
        }
      }
      else {
        return null;
      }
    });
}

export function saveDeck (title) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: `${title}`,
      questions: []
    }
  }));
}

export function saveCardToDeck (title, question, answer) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title].questions.push({
        question,
        answer
      });
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
    });
}