import { combineReducers } from 'redux';
import BloodBankReducer from './BloodBankReducer';
import UserReducer from './userReducer';

const rootReducer = combineReducers({
    BloodBankReducer, UserReducer
});

export default rootReducer;