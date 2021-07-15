// define types
import { LOGIN, SIGNUP, GET_CURRENT_USER, FETCH_RESULT_DATA, ERROR, } from './types'


import { initialState } from './globalStore'



export default function rootReducer(state = initialState, action) {
	switch (action.type) {

		//USER REDUCER
		case LOGIN:
			return action.payload.user
		case SIGNUP:
			return action.payload.newUser
		case GET_CURRENT_USER:
			return { ...state, user: action.payload }


		//RESULT REDUCER
		case FETCH_RESULT_DATA:
			return { ...state, result: action.payload }


		case ERROR:
			return { ...state, error: action.payload }

		default:
			return state
	}
}
