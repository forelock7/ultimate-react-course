const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload, isLoading: false };
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
    case 'account/convertingCurrency':
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
    );
    const data = await res.json();
    const converted = data.rates.USD;
    console.log(converted);
    dispatch({ type: 'account/deposit', payload: converted });
  };
}

export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}

export function payloan() {
  return { type: 'account/payloan' };
}

// store.dispatch({ type: 'account/deposit', payload: 500 });
// console.log(store.getState());
// store.dispatch({ type: 'account/withdraw', payload: 200 });
// console.log(store.getState());
// store.dispatch({ type: 'account/requestLoan', payload: { amount: 1000, purpose: 'Buy Car' } });
// console.log(store.getState());
// store.dispatch({ type: 'account/payloan' });
// console.log(store.getState());

// store.dispatch(deposit(500));
// console.log(store.getState());
// store.dispatch(withdraw(200));
// console.log(store.getState());
// store.dispatch(requestLoan(1000, 'Buy Car'));
// console.log(store.getState());
// store.dispatch(payloan());
// console.log(store.getState());
