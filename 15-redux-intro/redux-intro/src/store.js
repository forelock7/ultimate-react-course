import { createStore } from 'redux';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      // later
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payloan':
      return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan };
    default:
      return state;
  }
}

const store = createStore(reducer);

// store.dispatch({ type: 'account/deposit', payload: 500 });
// console.log(store.getState());
// store.dispatch({ type: 'account/withdraw', payload: 200 });
// console.log(store.getState());
// store.dispatch({ type: 'account/requestLoan', payload: { amount: 1000, purpose: 'Buy Car' } });
// console.log(store.getState());
// store.dispatch({ type: 'account/payloan' });
// console.log(store.getState());

function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}

function payloan() {
  return { type: 'account/payloan' };
}

store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(200));
console.log(store.getState());
store.dispatch(requestLoan(1000, 'Buy Car'));
console.log(store.getState());
store.dispatch(payloan());
console.log(store.getState());
