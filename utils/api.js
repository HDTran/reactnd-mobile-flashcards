import { AsyncStorage } from 'react-native';

const FLASHCARD_STORAGE_KEY = 'flashcards:decks';

export function getDecks () {
  AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((data) => {
      if(data !== null) {
        return JSON.parse(data);
      }
      else {
        return {};
      }
    });
}

export function getDeck (title) {
  AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
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

export function saveDeckTitle (title) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results);
    data[title] = {
      title: `${title}`,
      questions: []
    };
    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
  });
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title].questions.push({
        question: card.question,
        answer: card.answer
      });
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
    });
}