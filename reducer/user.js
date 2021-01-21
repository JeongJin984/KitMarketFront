import produce from 'immer'

const initialState = {
	error: "",
	isLoggedIn: false,
	isLogginIn: false,
	me: {
		username: "",
		password: ""
	}
}

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const userReducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case LOGIN_REQUEST :
				draft.isLogginIn = true
				draft.isLoggedIn = false
				draft.error = ""
				break
			
			case LOGIN_SUCCESS :
				draft.isLogginIn = false
				draft.isLoggedIn = true
				draft.error = ""
				draft.me = action.data
				break

			case LOGIN_FAILURE :
				draft.isLogginIn = false
				draft.isLoggedIn = true
				draft.error = action.error
				draft.me = null
				break

			default:
				break
		}
	})
}

export default userReducer