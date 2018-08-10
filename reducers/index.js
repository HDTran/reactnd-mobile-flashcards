import { ADD_DECK, ADD_QUESTION, RECEIVE_DECKS } from '../actions';

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: `${action.title}`,
          questions: []
        }
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.title]: [
          ...state[action.title],
          { question: action.question, answer: action.answer }
        ]
      };
    default:
      return state;
  }
}

export default decks;