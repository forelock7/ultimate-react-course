import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  nationalID: '',
  createAt: '',
};

const customerReducer = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: { fullName, nationalID, createAt: new Date().toISOString() },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createAt = action.payload.createAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerReducer.actions;
export default customerReducer.reducer;

// const initialStateCustomer = {
//   fullName: '',
//   nationalID: '',
//   createAt: '',
// };

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case 'customer/createCustomer':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         reateAt: action.payload.createAt,
//       };
//     case 'customer/updateName':
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: 'customer/createCustomer',
//     payload: { fullName, nationalID, createAt: new Date().toISOString() },
//   };
// }

// export function updateName(fullName) {
//   return { type: 'account/updateName', payload: fullName };
// }

// store.dispatch(createCustomer('Vova', 'ewewew32323'));
// console.log(store.getState());
