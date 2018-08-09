export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveEntries (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addEntry (title) {
  return {
    type: ADD_DECK,
    title
  };
}

export function addQuestion (deckTitle, question, answer) {
  return {
    type: ADD_DECK,
    deckTitle,
    question,
    answer
  };
}