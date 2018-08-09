import { AsyncStorage } from 'react-native';

const FLASHCARD_STORAGE_KEY = 'flashcards:decks';

export function getDecks () {
  return JSON.parse(AsyncStorage.getItem(FLASHCARD_STORAGE_KEY));
}

export function getDeck (title) {
  return JSON.parse(AsyncStorage.getItem(FLASHCARD_STORAGE_KEY))[title];
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