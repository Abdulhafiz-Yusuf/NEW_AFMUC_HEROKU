import * as ACTION_TYPES from '../_actions/types'


const initialState = {
    bcDetail: [],
    bgDetail: [],
    Error: null,
    booking: {}

}

export default function BloodBankReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.FETCH_BLOOD_GROUP:
            return { ...state, bg: action.payload }

        case ACTION_TYPES.FETCH_BLOOD_GROUP_BY_ID:
            return { ...state, bcDetail: action.payload.bcDetail, bgDetail: action.payload.bgDetail }

        case ACTION_TYPES.FECTCH_BOOKING:
            return { ...state, booking: action.payload }

        case ACTION_TYPES.ADD_BOOKING:
            return { ...state, booking: action.payload }
        default:
            return state;
    }
}