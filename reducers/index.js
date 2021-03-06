import { ADD_DECK, ADD_CARD, RECEIVE_DECKS } from '../actions';

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
    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [
            ...state[action.title].questions,
            { question: action.question, answer: action.answer }
          ]
        }
      };
    default:
      return state;
  }
}

export default decks;