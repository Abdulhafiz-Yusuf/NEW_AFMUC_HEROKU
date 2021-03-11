import axios from 'axios';
import * as ACTION_TYPES from './types';
import { USER_SERVER } from '../../Config.json';



//=========================
//  User actions
//=========================

export function checkifUserExist(user) {
    const request = axios.post(`${USER_SERVER}/checkIfUserExistInDB`, user)
        .then(response => {
            /**If userExist is True
             * NB: Else case is handle in the userDashboard Component. on If is handled below
             */
            if (response.data.userExist) {
                /**return full user info to redux..... 
                *since default value of userExist in redux is True, there is no need to return it again */
                return {
                    type: ACTION_TYPES.USER_EXIST,
                    payload: { userExist: response.data.userExist, user: response.data.user }
                }
            }
            else {
                /**return userExist === false info to redux.....*/
                return {
                    type: ACTION_TYPES.USER_DOES_NOT_EXIST,
                    payload: { userExist: response.data.userExist }
                }
            }
        })
        .catch(err => {
            return {
                type: ACTION_TYPES.ERROR_CATCH,
                payload: err.message
            }
        })
    return request
}


export async function completeRegistration(dataToSubmit) {
    //Collect complete user info from 'complete registration page' then post to db and return full user info
    const request = await axios.post(`${USER_SERVER}/regCompletion`, dataToSubmit)
        .then(response => {
            return ({
                type: ACTION_TYPES.GET_USER_FULL_INFO,
                payload: { user: response.data.user, success: response.data.success }
            })
        })
        .catch(err => {
            return {
                type: ACTION_TYPES.ERROR_CATCH,
                payload: err.message
            }
        })
    return request
}

export function clearError() {
    return ({
        type: ACTION_TYPES.CLEAR_ERROR,
        payload: undefined
    })
}


export function viewPageAction(page) {
    return ({
        type: ACTION_TYPES.VIEWPAGE,
        payload: page
    })
}



export async function makeADonor(userId) {
    const request = await axios.put(`${USER_SERVER}/makeADonor`, userId)
        .then(response => {
            return ({
                type: ACTION_TYPES.MAKEADONOR,
                payload: response.data
            })
        })
        .catch(err => {
            return {
                type: ACTION_TYPES.ERROR_CATCH,
                payload: err.message
            }
        })
    return request
}


export async function searchDonor(userId) {
    const request = await axios.put(`${USER_SERVER}/makeADonor`, userId)
        .then(response => {
            return ({
                type: ACTION_TYPES.MAKEADONOR,
                payload: response.data
            })
        })
        .catch(err => {
            return {
                type: ACTION_TYPES.ERROR_CATCH,
                payload: err.message
            }
        })
    return request
}
