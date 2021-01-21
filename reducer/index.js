import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import user from './user'
import post from './post'

const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			// Attention! This will overwrite client state! Real apps should use proper reconciliation.
			return { ...state, ...action.payload }
		default: {
			const combineReducer = combineReducers({
				user,
				post
			})
			return combineReducer(state, action)
		}
	}
};

export default rootReducer