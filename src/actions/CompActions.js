import axios from 'axios';
import { GET_COMPANIES_SUCCESS } from './types';
import { API_URL_1 } from '../supports/api-url/apiurl';

export const updateCompanyList = () => {
    return (dispatch) => {
        axios.get(`${API_URL_1}/company_list`)
        .then((response) => {
            dispatch ({
                type: GET_COMPANIES_SUCCESS,
                payload: response.data.companies
            })
        })
    }
}

export const addCompany = (company) => {
    return (dispatch) => {
        axios.post(`${API_URL_1}/add_company`, company)
        .then((response) => {
            dispatch ({
                type: GET_COMPANIES_SUCCESS,
                payload: response.data.companies
            })
        })
    }
}

export const deleteCompany = (company_id) => {
    return (dispatch) => {
        axios.delete(`${API_URL_1}/delete_company/${company_id}`)
        .then((response) => {
            dispatch ({
                type: GET_COMPANIES_SUCCESS,
                payload: response.data.companies
            })
        })
    }
}
