import axios from 'axios'

import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import { 
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE
} from "../reducer/post";

// function postChatAPI(data) {
// 	return axios.post('/chat/', data)
// }

function* postChat(action) {
	try {
//		yield call(postChatAPI, action.data)
		yield put({
			type: ADD_POST_SUCCESS,
			data: action.data
		})
	} catch (error) {
		yield put({
			type: ADD_POST_FAILURE,
			error: error
		})
	}
}

function* watchPostChat(){
	yield takeLatest(ADD_POST_REQUEST, postChat)
}

export default function* chattingSaga() {
	yield all([
		fork(watchPostChat)
	])	
}