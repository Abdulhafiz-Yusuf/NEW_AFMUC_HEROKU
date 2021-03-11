import * as ACTION_TYPES from '../_actions/types';

//=========================
//  User reducers
//=========================
const initialState = {
    UserExist: true,
    user: null,
    Error: "Error Availabe",
    ViewPage: 'profile',
    bg: [],
}

export default function UserReducer(state = initialState, action) {
    switch (action.type) {

        case ACTION_TYPES.USER_EXIST:
            return { ...state, user: action.payload.user }

        case ACTION_TYPES.USER_DOES_NOT_EXIST:
            return { ...state, UserExist: action.payload.UserExist }

        case ACTION_TYPES.GET_USER_FULL_INFO:
            return { ...state, UserExist: action.payload.user }


        case ACTION_TYPES.ERROR_CATCH:
            return { ...state, user: action.payload, Error: action.payload }

        case ACTION_TYPES.CLEAR_ERROR:
            return { ...state, Error: action.payload }

        case ACTION_TYPES.VIEWPAGE:
            return { ...state, ViewPage: action.payload }

        // case ACTION_TYPES.MAKEADONOR:
        //     return { ...state, donorStatus: action.payload }

        default:
            return state;
    }
}