const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createAt: '',
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        reateAt: action.payload.createAt,
      };
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return { type: 'account/updateName', payload: fullName };
}

// store.dispatch(createCustomer('Vova', 'ewewew32323'));
// console.log(store.getState());
