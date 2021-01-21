import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import { 
	LOGIN_REQUEST,
	LOGIN_SUCCESS, 
	LOGIN_FAILURE, 
} from '../reducer/user'

import axios from 'axios'
const { frontURL } = require('../config/config')

// function logInAPI(data) {
// 	return axios.post('/user/login', data)
// }

function* logIn(action) {
	try {
		// const result = yield call(logInAPI, action.data)
		console.log("asdfasdf")
		yield put({
			type: LOGIN_SUCCESS,
			data: action.data
		})
	} catch (error) {
		yield put({
			type: LOGIN_FAILURE,
			error: error
		})
	}
}

function* watchLogIn() {
	yield takeLatest(LOGIN_REQUEST, logIn)
}

export default function* userSaga() {
	yield all([
		fork(watchLogIn)
	])
}