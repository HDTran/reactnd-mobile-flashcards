import { AsyncStorage } from 'react-native';

const FLASHCARD_STORAGE_KEY = 'flashcards:decks';

export function getDecks () {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((data) => {
      if(data !== null && data !== undefined) {
        return JSON.parse(data);
      }
      else {
        return {
          'Starter Deck': {
            title: 'Starter Deck',
            questions: []
          }
        };
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

export function saveDeckTitle (title) {
  AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: `${title}`,
      questions: []
    }
  }));
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