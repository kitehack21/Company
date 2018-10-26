import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';

export const updateCompanyList = () => {
    return (dispatch) => {
        axios.get(`${API_URL_1}/company_list`)
        .then((response) => {
            dispatch ({
                type: `GET_COMPANIES_SUCCESS`,
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
                type: `GET_COMPANIES_SUCCESS`,
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
                type: `GET_COMPANIES_SUCCESS`,
                payload: response.data.companies
            })
        })
    }
}

export const updateOfficeList = (company_id) => {
    return (dispatch) => {
        axios.get(`${API_URL_1}/office_list?id=${company_id}`)
        .then((response) => {
            console.log(response.data)
            dispatch ({
                type: `GET_OFFICES_SUCCESS`,
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
                type: `GET_OFFICES_SUCCESS`,
                payload: response.data.offices
            })
        })
    }
}
