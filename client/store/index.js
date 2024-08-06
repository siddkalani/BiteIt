// import { configureStore } from "@reduxjs/toolkit";
// import userDetailSlice from "./Slices/userDetailSlice";
// import createSagaMiddleware from 'redux-saga'
// import resendVerificationSlice from "./Slices/resendVerificationSlice";
// import SagaData from './saga'

// const sagaMiddleware = createSagaMiddleware()

// const store = configureStore({
//   reducer: {
//     users: userDetailSlice.reducer,
//     // resendVerification: resendVerificationSlice.reducer,
//     middleware: ()=>[sagaMiddleware]
//   },
// });

// sagaMiddleware.run(SagaData)
// export default store;

// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userDetailSlice from './Slices/userDetailSlice';
import resendVerificationSlice from './Slices/resendVerificationSlice';
import SagaData from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    users: userDetailSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga
// sagaMiddleware.run(SagaData);

export default store;

