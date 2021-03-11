import axios from 'axios';
import * as ACTION_TYPES from './types';
import { BLOODCENTER_SERVER } from '../../Config.json';

export function fetchBlood() {
    const request = axios.get(`${BLOODCENTER_SERVER}/`)
        .then(response => {
            if (response.data)
                return {
                    type: ACTION_TYPES.FETCH_BLOOD_GROUP,
                    payload: response.data
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


export async function fetchBloodbyId(bgId) {
    const request = await axios.get(`${BLOODCENTER_SERVER}/blood_by_id?id=${bgId}`)
        .then(response => {
            if (response.data)
                return {
                    type: ACTION_TYPES.FETCH_BLOOD_GROUP_BY_ID,
                    payload: { bcDetail: response.data.bcDetail, bgDetail: response.data.bgDetail }
                }
        })
        .catch(err => {
            return {
                type: ACTION_TYPES.ERROR_CATCH,
                payload: err.response.data.Error
            }
        })
    return request
}

export async function readBooking(user) {
    const request = await axios.post(`${BLOODCENTER_SERVER}/readBooking`, user)
        .then(response => {
            if (response.data)
                return {
                    type: ACTION_TYPES.FECTCH_BOOKING,
                    payload: response.data
                }
        })
        .catch(err => {
            return {
                type: ACTION_TYPES.ERROR_CATCH,
                payload: err.response.data.Error
            }
        })
    return request
}



export async function addBooking(userId, bcDetail, bgDetail) {
    const bookData = {
        bc_id: bcDetail.bc_id,
        bg_id: bgDetail.bg_id,
        users_id: userId
    }
    const request = await axios.post(`${BLOODCENTER_SERVER}/addBooking`, bookData)
        .then(response => {
            if (response.data)
                return {
                    type: ACTION_TYPES.ADD_BOOKING,
                    payload: response.data.success
                }
        })
        .catch(err => {
            return {
                type: ACTION_TYPES.ERROR_CATCH,
                payload: err.response.data.Error
            }
        })
    return request
}