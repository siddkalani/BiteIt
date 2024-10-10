// saga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginUser } from './Slices/userDetailSlice'; // Adjust the path as needed

function* handleLoginUser(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:3000/user/login', action.payload);
    yield put(loginUser.fulfilled(response.data));
  } catch (error) {
    if (error.response) {
      yield put(loginUser.rejected(error.response?.data?.message || "Login Failed"));
    } else if (error.request) {
      yield put(loginUser.rejected("No response from server"));
    } else {
      yield put(loginUser.rejected("An error occurred: " + error.message));
    }
  }
}

function* SagaData() {
  yield takeLatest(loginUser.pending.type, handleLoginUser);
}

export default SagaData;
