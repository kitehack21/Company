import axios from 'axios';
import { GET_OFFICES_SUCCESS } from './types';
import { API_URL_1 } from '../supports/api-url/apiurl';

export const updateOfficeList = (company_id) => {
    return (dispatch) => {
        axios.get(`${API_URL_1}/office_list?id=${company_id}`)
        .then((response) => {
            console.log(response.data)
            dispatch ({
                type: GET_OFFICES_SUCCESS,
                payload: response.data.offices
            })
        })
    }
}

export const addOffice = (office) => {
    return (dispatch) => {
        axios.post(`${API_URL_1}/add_office`, office)
        .then((response) => {
            console.log(response)
        })
    }
}

export const deleteOffice = (office_id, company_id) => {
    return (dispatch) => {
        axios.post(`${API_URL_1}/delete_office`, {
            company_id: company_id,
            office_id: office_id
        })
        .then((response) => {
            dispatch ({
                type: GET_OFFICES_SUCCESS,
                payload: response.data.offices
            })
        })
    }
}
