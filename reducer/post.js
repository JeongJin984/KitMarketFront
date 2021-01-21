import produce from 'immer'

const initialState = {
	email:'',
	isPosting: false,
	isPosted: false,
	error: ""
}

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

const postReducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case ADD_POST_REQUEST :
				draft.isPosting = true
				draft.isPosted = false
				draft.error = ""
				break
			
			case ADD_POST_SUCCESS :
				draft.isPosting = false
				draft.isPosted = true
				draft.error = ""
				break

			case ADD_POST_FAILURE :
				draft.error = action.error
				break

			default:
				break
		}
	})
}

export default postReducer