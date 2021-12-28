import { ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE, SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editedExpense: false,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.expense,
        },
      ],
      editedExpense: false,
    };
  case REMOVE_EXPENSE:
    return {
      expenses: state.expenses.filter(({ id }) => id !== action.expense.id),
      editedExpense: false,
    };
  case EDIT_EXPENSE:
    return { expenses: state.expenses, editedExpense: action.expense };
  case SAVE_EXPENSE:
    return {
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.expense.id) {
          return action.expense;
        }
        return expense;
      }),
      editedExpense: false,
    };
  default:
    return state;
  }
}
