import { SAVE_EMAIL } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
export default function user(state = {}, { type, email }) {
  if (type === SAVE_EMAIL) return { email };
  return state;
}
