import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';

export const onLogin = (user) => {
    return(dispatch) => {
            axios.post(API_URL_1 +'/login', {
                    email: user.email,
                    password: user.password
            }).then(user => {
                console.log(user);
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { firstname: user.data[0].firstname, email: user.data[0].email, error: "", id: user.data[0].id, cookieCheck: true }
                })       
            }).catch(err => {
                console.log(err);
                dispatch ({
                    type: "USER_LOGIN_FAIL"
                });
            })
        }
    }
